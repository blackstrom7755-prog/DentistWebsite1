import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { CalendarCheck, Clock, Users, Search, Check, X, LogOut, ShieldCheck, Lock, Stethoscope, Loader2 } from "lucide-react";

const ADMIN_PASSWORD = "admin123";

type Appointment = {
  id: string;
  created_at: string;
  patient_name: string;
  patient_phone: string | null;
  email: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  service_type: string | null;
  treatment_type: string | null;
  status: string;
  notes: string | null;
};

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [processingAction, setProcessingAction] = useState<{ id: string, type: 'confirm' | 'cancel' } | null>(null);
  const [successAction, setSuccessAction] = useState<{ id: string, type: 'confirm' | 'cancel' } | null>(null);

  const fetchAppointments = useCallback(async (silent = false, isPollingFetch = false) => {
    if (!silent) setLoading(true);
    if (isPollingFetch) setIsPolling(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load appointments");
      console.error(error);
    } else {
      console.log('Fetched Data:', data);
      setAppointments((data as Appointment[]) || []);
    }
    if (!silent) setLoading(false);
    if (isPollingFetch) setIsPolling(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchAppointments();
      const intervalId = setInterval(() => {
        fetchAppointments(true, true);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [authenticated, fetchAppointments]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleConfirm = async (id: string, email: string | null) => {
    setProcessingAction({ id, type: 'confirm' });
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "confirmed" })
      .eq("id", Number(id))
      .select();

    if (error) {
      alert(`Supabase Error Message: ${error.message}\nHint: ${error.hint}`);
      console.error("Supabase update error:", error);
      setProcessingAction(null);
    } else if (!data || data.length === 0) {
      alert("Update failed (likely due to database permissions/RLS, or ID mismatch)!");
      console.error("0 rows updated. Please check Supabase Row Level Security policies.");
      setProcessingAction(null);
    } else {
      setProcessingAction(null);
      setSuccessAction({ id, type: 'confirm' });
      console.log(`Sending Confirmation Email to ${email}...`);
      toast.success("Status Updated");
      await fetchAppointments();
      
      setTimeout(() => {
        setSuccessAction(null);
      }, 2000);
    }
  };

  const handleCancel = async (id: string, email: string | null) => {
    setProcessingAction({ id, type: 'cancel' });
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", Number(id))
      .select();

    if (error) {
      alert(`Supabase Error Message: ${error.message}\nHint: ${error.hint}`);
      console.error("Supabase update error:", error);
      setProcessingAction(null);
    } else if (!data || data.length === 0) {
      alert("Update failed (likely due to database permissions/RLS, or ID mismatch)!");
      console.error("0 rows updated. Please check Supabase Row Level Security policies.");
      setProcessingAction(null);
    } else {
      setProcessingAction(null);
      setSuccessAction({ id, type: 'cancel' });
      toast.success("Status Updated");
      await fetchAppointments();
      
      setTimeout(() => {
        setSuccessAction(null);
      }, 2000);
    }
  };

  const filtered = appointments.filter(
    (a) =>
      a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.patient_phone || "").includes(search) ||
      (a.service_type || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalRequests = appointments.length;
  const pendingCount = appointments.filter((a) => {
    const s = a.status?.toLowerCase() || "pending";
    return s !== "confirmed" && s !== "cancelled";
  }).length;
  const confirmedToday = appointments.filter((a) => {
    if (a.status?.toLowerCase() !== "confirmed") return false;
    const today = new Date().toISOString().split("T")[0];
    return a.appointment_date?.startsWith(today);
  }).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">
                <ShieldCheck className="w-4 h-4 mr-2" /> Unlock Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Clinic Dashboard
            {isPolling && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin ml-2" />}
          </h1>
          <Button variant="ghost" size="sm" onClick={() => setAuthenticated(false)}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold text-foreground">{totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Action</p>
                  <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed Today</p>
                  <p className="text-2xl font-bold text-foreground">{confirmedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search + Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg">Appointments</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">Loading appointments...</div>
            ) : filtered.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8 text-primary opacity-80" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">No new requests yet</h3>
                <p className="text-muted-foreground">When patients book online, their requests will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date / Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((apt) => {
                      console.log('Database Row:', apt);
                      return (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.patient_name}</TableCell>
                        <TableCell>
                          <div className="text-sm">{apt.email || "—"}</div>
                          <div className="text-xs text-muted-foreground">{apt.patient_phone || "—"}</div>
                        </TableCell>
                        <TableCell>{apt.service_type}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {apt.appointment_date
                              ? new Date(apt.appointment_date).toLocaleDateString()
                              : ""}
                          </div>
                          <div className="text-xs text-muted-foreground">{apt.appointment_time}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              apt.status?.toLowerCase() === "confirmed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : apt.status?.toLowerCase() === "cancelled"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {apt.status || "pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {apt.status?.toLowerCase() !== "confirmed" && (
                              <Button
                                size="sm"
                                disabled={processingAction !== null}
                                className={
                                  successAction?.id === apt.id && successAction.type === 'confirm'
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }
                                onClick={() => handleConfirm(apt.id, apt.email)}
                              >
                                {processingAction?.id === apt.id && processingAction.type === 'confirm' ? (
                                  <>Processing...</>
                                ) : successAction?.id === apt.id && successAction.type === 'confirm' ? (
                                  <><Check className="w-4 h-4" /></>
                                ) : (
                                  <><Check className="w-3 h-3 mr-1" /> Confirm</>
                                )}
                              </Button>
                            )}
                            {apt.status?.toLowerCase() !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={processingAction !== null}
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleCancel(apt.id, apt.email)}
                              >
                                {processingAction?.id === apt.id && processingAction.type === 'cancel' ? (
                                  <>Processing...</>
                                ) : successAction?.id === apt.id && successAction.type === 'cancel' ? (
                                  <><Check className="w-4 h-4 text-green-600" /></>
                                ) : (
                                  <><X className="w-3 h-3 mr-1" /> Cancel</>
                                )}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
