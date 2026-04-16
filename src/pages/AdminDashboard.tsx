import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  CalendarCheck, Clock, Users, Search, Check, X, LogOut,
  Stethoscope, Loader2, ArrowDown, ArrowUp, ArrowUpDown,
  Download, MessageCircle,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

type Appointment = {
  id: string;
  created_at: string;
  patient_name: string;
  phone: string | null;
  email: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  service_type: string | null;
  treatment_type: string | null;
  status: string;
  notes: string | null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "service" | "status" | "recent">("recent");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [processingAction, setProcessingAction] = useState<{ id: string; type: "confirm" | "cancel" } | null>(null);
  const [successAction, setSuccessAction] = useState<{ id: string; type: "confirm" | "cancel" } | null>(null);

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
      setAppointments((data as Appointment[]) || []);
    }
    if (!silent) setLoading(false);
    if (isPollingFetch) setIsPolling(false);
  }, []);

  useEffect(() => {
    fetchAppointments();
    const intervalId = setInterval(() => {
      fetchAppointments(true, true);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [fetchAppointments]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  // ── Helper: format any Indian phone number to +91XXXXXXXXXX ────────────────
  const formatPhoneIN = (raw: string): string => {
    let digits = raw.replace(/\D/g, "");                  // strip non-digits
    if (digits.startsWith("0")) digits = "91" + digits.slice(1); // 0XX → 91XX
    if (digits.length === 10)   digits = "91" + digits;          // 10-digit → +91
    return `+${digits}`;
  };

  const handleConfirm = async (id: string, email: string | null) => {
    setProcessingAction({ id, type: "confirm" });

    // ── Step 1: Update the DB status to "confirmed" ──────────────────────────
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "confirmed" })
      .eq("id", Number(id))
      .select();

    if (error) {
      alert(`Supabase Error Message: ${error.message}\nHint: ${error.hint}`);
      console.error("Supabase update error:", error);
      setProcessingAction(null);
      return;
    }

    if (!data || data.length === 0) {
      alert("Update failed (likely due to database permissions/RLS, or ID mismatch)!");
      console.error("0 rows updated. Please check Supabase Row Level Security policies.");
      setProcessingAction(null);
      return;
    }

    // ── Step 2: DB confirmed — update UI immediately ──────────────────────────
    const confirmedApt = data[0] as Appointment;
    setProcessingAction(null);
    setSuccessAction({ id, type: "confirm" });
    await fetchAppointments();
    setTimeout(() => setSuccessAction(null), 2000);

    // ── Step 3: Trigger WhatsApp confirmation via Edge Function ───────────────
    if (confirmedApt?.phone) {
      try {
        // Pre-format the phone number to +91 E.164 before sending
        const formattedPhone = formatPhoneIN(confirmedApt.phone);

        const waRes = await fetch(
          "https://izbdbdjrcbhbepbyrgjk.supabase.co/functions/v1/send-whatsapp-confirmation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY as string}`,
            },
            body: JSON.stringify({
              patientName:     confirmedApt.patient_name,
              phoneNumber:     formattedPhone,           // already +91XXXXXXXXXX
              appointmentDate: confirmedApt.appointment_date,
              appointmentTime: confirmedApt.appointment_time ?? undefined,
            }),
          }
        );

        if (waRes.ok) {
          const waData = await waRes.json();
          console.log("✅ WhatsApp sent. Twilio SID:", waData.message_sid);
          // ── Combined success toast (as requested) ─────────────────────────
          toast.success("✅ Database updated and WhatsApp notification triggered!");
        } else {
          const waErr = await waRes.json();
          console.error("WhatsApp Edge Function error:", waErr);
          // DB is committed — only the WhatsApp step failed
          toast.warning(
            `⚠️ Database updated but WhatsApp failed (${waErr?.error ?? "unknown error"}). Please notify the patient manually.`
          );
        }
      } catch (waException) {
        console.error("WhatsApp fetch threw an exception:", waException);
        toast.warning(
          "⚠️ Database updated but WhatsApp could not be reached. Check your network or Supabase function logs."
        );
      }
    } else {
      // No phone on record — DB is confirmed, just skip WhatsApp
      toast.success("✅ Database updated! (No phone number — WhatsApp skipped.)");
      console.info(`Appointment ${id} confirmed — no phone on record, skipping WhatsApp.`);
    }
  };

  const handleCancel = async (id: string, email: string | null) => {
    setProcessingAction({ id, type: "cancel" });
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
      setSuccessAction({ id, type: "cancel" });
      toast.success("Status Updated");
      await fetchAppointments();

      setTimeout(() => {
        setSuccessAction(null);
      }, 2000);
    }
  };

  // ── CSV Export ──
  const exportToCSV = () => {
    if (appointments.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "Patient Name",
      "Email",
      "Phone",
      "Service Type",
      "Treatment Type",
      "Appointment Date",
      "Appointment Time",
      "Status",
      "Notes",
      "Created At",
    ];

    const escapeCSV = (value: string | null | undefined): string => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = appointments.map((apt) => [
      escapeCSV(apt.patient_name),
      escapeCSV(apt.email),
      escapeCSV(apt.phone),
      escapeCSV(apt.service_type),
      escapeCSV(apt.treatment_type),
      escapeCSV(
        apt.appointment_date
          ? new Date(apt.appointment_date).toLocaleDateString()
          : ""
      ),
      escapeCSV(apt.appointment_time),
      escapeCSV(apt.status || "pending"),
      escapeCSV(apt.notes),
      escapeCSV(
        apt.created_at
          ? new Date(apt.created_at).toLocaleString()
          : ""
      ),
    ]);

    // UTF-8 BOM for Apple Numbers compatibility
    const BOM = "\uFEFF";
    const csvContent = BOM + headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const today = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `Clinic_Leads_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${appointments.length} records`);
  };

  // ── Sorting ──
  const handleSort = (column: "date" | "service" | "status") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  let filtered = appointments.filter(
    (a) =>
      a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.phone || "").includes(search) ||
      (a.service_type || "").toLowerCase().includes(search.toLowerCase())
  );

  filtered = [...filtered].sort((a, b) => {
    let result = 0;

    if (sortBy === "recent") {
      // Default: created_at descending (freshest first)
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      result = dateB - dateA;
      return result; // Always descending for "recent"
    } else if (sortBy === "date") {
      const dateA = a.appointment_date ? new Date(a.appointment_date).getTime() : Infinity;
      const dateB = b.appointment_date ? new Date(b.appointment_date).getTime() : Infinity;

      if (dateA !== dateB) {
        result = dateA - dateB;
      } else {
        const timePriority: Record<string, number> = {
          Morning: 1,
          Afternoon: 2,
          Evening: 3,
        };

        const timeA = a.appointment_time || "";
        const timeB = b.appointment_time || "";

        const pA = timePriority[timeA] || 4;
        const pB = timePriority[timeB] || 4;

        result = pA - pB;
      }
    } else if (sortBy === "service") {
      const sA = (a.service_type || "").toLowerCase();
      const sB = (b.service_type || "").toLowerCase();
      result = sA.localeCompare(sB);
    } else if (sortBy === "status") {
      const score = (status: string) =>
        status?.toLowerCase() === "pending" ? 0 : status?.toLowerCase() === "confirmed" ? 1 : 2;
      result = score(a.status) - score(b.status);
    }

    if (result === 0) return 0;
    return sortOrder === "asc" ? result : -result;
  });

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4 ml-1 text-muted-foreground/30 inline" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1 text-primary inline" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1 text-primary inline" />
    );
  };

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

  const isPending = (status: string | undefined) => {
    const s = (status || "pending").toLowerCase();
    return s !== "confirmed" && s !== "cancelled";
  };

  // ── WhatsApp Utility ──
  const DEFAULT_COUNTRY_CODE = "91"; // India

  const sanitizePhone = (phone: string): string => {
    // Remove all non-digit characters
    let digits = phone.replace(/[^\d]/g, "");
    // If starts with 0, strip it and prepend country code
    if (digits.startsWith("0")) {
      digits = DEFAULT_COUNTRY_CODE + digits.substring(1);
    }
    // If number is 10 digits (no country code), prepend default
    if (digits.length === 10) {
      digits = DEFAULT_COUNTRY_CODE + digits;
    }
    return digits;
  };

  const buildWhatsAppUrl = (apt: Appointment): string => {
    const phone = sanitizePhone(apt.phone || "");
    const dateStr = apt.appointment_date
      ? new Date(apt.appointment_date).toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "your preferred date";
    const timeStr = apt.appointment_time || "your preferred time";
    const message = `Hello ${apt.patient_name}, this is Dr. DentCare+. We received your request for a dental appointment. Are you available on ${dateStr} at ${timeStr}?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Clinic Dashboard
            {isPolling && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin ml-2" />}
          </h1>
          <div className="flex items-center gap-2">
            {session?.user?.email && (
              <span className="text-xs text-muted-foreground hidden sm:inline font-body">
                {session.user.email}
              </span>
            )}
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 dark:text-slate-300">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800">
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
          <Card className="bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800">
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
          <Card className="bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800">
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

        {/* Search + Export + Table */}
        <Card className="bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg">Appointments</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportToCSV}
                  className="shrink-0 gap-2"
                  disabled={appointments.length === 0}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download Patient List (Numbers/Excel)</span>
                  <span className="sm:hidden">Export CSV</span>
                </Button>
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
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
                        onClick={() => handleSort("service")}
                      >
                        <div className="flex items-center">Service {renderSortIcon("service")}</div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">Date / Time {renderSortIcon("date")}</div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center">Status {renderSortIcon("status")}</div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {isPending(apt.status) && (
                              <span className="new-lead-dot" title="New lead — pending action" />
                            )}
                            {apt.patient_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{apt.email || "—"}</div>
                          <div className="text-xs text-muted-foreground">{apt.phone || "—"}</div>
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
                            {/* WhatsApp Button */}
                            {apt.phone && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all duration-200 hover:shadow-[0_0_12px_rgba(37,211,102,0.15)]"
                                    onClick={() => window.open(buildWhatsAppUrl(apt), "_blank")}
                                  >
                                    <MessageCircle className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>Message Patient via WhatsApp</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {apt.status?.toLowerCase() !== "confirmed" && (
                              <Button
                                size="sm"
                                disabled={processingAction !== null}
                                className={
                                  successAction?.id === apt.id && successAction.type === "confirm"
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }
                                onClick={() => handleConfirm(apt.id, apt.email)}
                              >
                                {processingAction?.id === apt.id && processingAction.type === "confirm" ? (
                                  <>Processing...</>
                                ) : successAction?.id === apt.id && successAction.type === "confirm" ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-3 h-3 mr-1" /> Confirm
                                  </>
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
                                {processingAction?.id === apt.id && processingAction.type === "cancel" ? (
                                  <>Processing...</>
                                ) : successAction?.id === apt.id && successAction.type === "cancel" ? (
                                  <>
                                    <Check className="w-4 h-4 text-green-600" />
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3 h-3 mr-1" /> Cancel
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
