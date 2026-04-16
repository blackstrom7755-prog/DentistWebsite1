import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Phone, Mail, Send, Loader2, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const SLOT_CAPACITY = 20;

const TIME_SLOTS = [
  { id: "09:00-11:00", label: "09:00 AM – 11:00 AM", startHour: 9 },
  { id: "11:00-13:00", label: "11:00 AM – 01:00 PM", startHour: 11 },
  { id: "13:00-15:00", label: "01:00 PM – 03:00 PM", startHour: 13 },
  { id: "15:00-17:00", label: "03:00 PM – 05:00 PM", startHour: 15 },
  { id: "17:00-19:00", label: "05:00 PM – 07:00 PM", startHour: 17 },
];

const ContactSection = () => {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    message: "", 
    preferredTime: "", 
    serviceType: "", 
    appointmentDate: "" 
  });
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute to keep validation fresh
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch slot counts when date changes
  useEffect(() => {
    if (form.appointmentDate) {
      fetchSlotCounts(form.appointmentDate);
    }
  }, [form.appointmentDate]);

  const fetchSlotCounts = async (date: string) => {
    setLoadingSlots(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", date);

      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((app) => {
        if (app.appointment_time) {
          counts[app.appointment_time] = (counts[app.appointment_time] || 0) + 1;
        }
      });
      setSlotCounts(counts);
    } catch (err) {
      console.error("Error fetching slot counts:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.preferredTime) {
      toast.error("Please select a time slot");
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        patient_name: form.name,
        phone: form.phone, // Reverted to 'phone' to match original schema
        email: form.email || null,
        appointment_date: form.appointmentDate || null,
        appointment_time: form.preferredTime || null,
        service_type: form.serviceType || null,
        status: "pending",
      });
      
      if (error) throw error;
      
      toast.success("Appointment Confirmed!", {
        description: "We'll see you on " + form.appointmentDate + " at " + form.preferredTime,
      });
      
      // Immediately re-fetch counts to update UI
      fetchSlotCounts(form.appointmentDate);
      
      setForm({ name: "", phone: "", email: "", message: "", preferredTime: "", serviceType: "", appointmentDate: "" });
    } catch (err: any) {
      console.error("Failed to save appointment:", err);
      toast.error(err.message || "An error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-[#0a0f16]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span style={{ color: '#0D9488' }} 
            className="font-display text-3xl md:text-2xl font-bold mb-6"
          >
            APPOINTMENT BOOKING
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-navy dark:text-white mb-6 tracking-tight leading-none">
            Secure Your Slot
          </h2>
          <p className="text-navy/60 dark:text-white/70 font-body text-lg md:text-xl leading-relaxed mb-4 max-w-xl mx-auto">
            Experience Dentistry 2.0. Our real-time system ensures you get the exact time you need with zero waiting.
          </p>
          <div className="flex justify-center mt-8">
            <GoogleReviewBadge />
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto text-left">
          <div className="md:col-span-3 bg-slate-50 dark:bg-zinc-900/50 rounded-[2rem] shadow-xl p-8 md:p-10 border border-navy/10 dark:border-white/10 text-left">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Patient Info */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-navy/5 dark:border-white/10 space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-mint-deep/20 dark:bg-accent/20 flex items-center justify-center">
                    <span className="text-mint-deep dark:text-accent text-sm">1</span>
                  </div>
                  Personal Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-body font-bold text-navy dark:text-white mb-2 block">Full Name *</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required className="bg-slate-100 dark:bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-mint-deep dark:focus-visible:ring-accent text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40" />
                  </div>
                  <div>
                    <label className="text-sm font-body font-bold text-navy dark:text-white mb-2 block">Phone *</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 91234 56789" required type="tel" className="bg-slate-100 dark:bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-mint-deep dark:focus-visible:ring-accent text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-body font-bold text-navy dark:text-white mb-2 block">Email Address</label>
                    <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" type="email" className="bg-slate-100 dark:bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-mint-deep dark:focus-visible:ring-accent text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40" />
                  </div>
                  <div>
                    <label className="text-sm font-body font-bold text-navy dark:text-white mb-2 block">Service Category</label>
                    <Select value={form.serviceType} onValueChange={(v) => setForm({ ...form, serviceType: v })}>
                      <SelectTrigger className="bg-slate-100 dark:bg-zinc-800 border-none h-12 rounded-xl focus:ring-mint-deep dark:focus:ring-accent text-navy dark:text-white">
                        <SelectValue placeholder="What do you need?" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Emergency Pain", "Routine Checkup", "Teeth Whitening", "Invisalign Consult", "Dental Implants", "Braces/Aligners", "Other"].map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {/* Date & Time Selection */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-navy/5 dark:border-white/10 space-y-6">
                <h3 className="font-display font-bold text-navy dark:text-white text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-mint-deep/20 dark:bg-accent/20 flex items-center justify-center">
                    <span className="text-mint-deep dark:text-accent text-sm">2</span>
                  </div>
                  Select Schedule
                </h3>
                
                <div>
                  <label className="text-sm font-body font-bold text-navy mb-2 block">Preferred Date *</label>
                  <div className="relative">
                    <Input 
                      value={form.appointmentDate} 
                      onChange={(e) => {
                        setForm({ ...form, appointmentDate: e.target.value, preferredTime: "" });
                      }} 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="bg-[#f4fbf9] border-none h-12 rounded-xl focus-visible:ring-accent text-navy relative z-10" 
                    />
                  </div>
                </div>

                <div className={cn("transition-all duration-500", !form.appointmentDate ? "opacity-30 pointer-events-none grayscale" : "opacity-100")}>
                  <label className="text-sm font-body font-bold text-navy mb-4 block">Available Time Slots</label>
                  <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                    {TIME_SLOTS.map((slot) => {
                      const count = slotCounts[slot.label] || 0;
                      const remaining = SLOT_CAPACITY - count;
                      const isFull = remaining <= 0;
                      
                      // Check if time has passed (Only for Today)
                      const todayStr = new Date().toISOString().split('T')[0];
                      const isSelectedToday = form.appointmentDate === todayStr;
                      const slotTime = new Date();
                      slotTime.setHours(slot.startHour, 0, 0, 0);
                      const hasPassed = isSelectedToday && currentTime > slotTime;
                      
                      const isDisabled = isFull || hasPassed;
                      const isSelected = form.preferredTime === slot.label;
                      
                      const progressValue = (count / SLOT_CAPACITY) * 100;
                      const progressColor = isFull ? "bg-red-500" : remaining < 5 ? "bg-orange-500" : "bg-emerald-500";

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setForm({ ...form, preferredTime: slot.label })}
                          className={cn(
                            "relative flex flex-col p-4 rounded-xl border-2 transition-all text-left group overflow-hidden",
                            isSelected 
                              ? "border-accent bg-accent/5 ring-1 ring-accent" 
                              : "border-transparent bg-white hover:border-[#f4fbf9] shadow-sm",
                            isDisabled && "bg-gray-50 border-transparent opacity-60 cursor-not-allowed"
                          )}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className={cn("font-bold text-sm", isDisabled ? "text-gray-400" : "text-navy")}>
                              {slot.label}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-accent animate-in zoom-in" />}
                          </div>
                          
                          <div className="mt-1 mb-3">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                              <span className={isDisabled ? "text-gray-400" : "text-navy/40"}>
                                {hasPassed ? "Window Passed" : isFull ? "Fully Booked" : `${remaining} slots left`}
                              </span>
                              <span className={isDisabled ? "text-gray-400" : "text-navy/40"}>
                                {isFull ? "100%" : `${Math.round(progressValue)}%`}
                              </span>
                            </div>
                            <Progress value={progressValue} className="h-1.5 bg-gray-100" indicatorClassName={progressColor} />
                          </div>

                          <span className={cn(
                            "text-[11px] font-medium transition-colors",
                            isDisabled ? "text-gray-400" : isSelected ? "text-accent" : "text-navy/60"
                          )}>
                            {hasPassed ? "Unavailable" : isFull ? "Next available: Tomorrow" : "Instant Confirmation"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-body font-bold text-navy mb-2 block">Clinical Notes (Optional)</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about any pain, specific concerns, or medical history..." rows={3} className="bg-[#f4fbf9] border-none rounded-xl focus-visible:ring-accent resize-none p-4 text-navy" />
              </div>

              <Button type="submit" className="w-full py-8 text-xl font-bold bg-[#0a192f] text-white hover:bg-navy/90 transition-all rounded-2xl shadow-xl flex items-center justify-center gap-3" disabled={sending || !form.preferredTime}>
                {sending ? <><Loader2 className="w-6 h-6 animate-spin" /> Confirming...</> : <><CheckCircle2 className="w-6 h-6" /> Confirm Appointment</>}
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-8 flex flex-col justify-start pt-4 text-left">
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Visit Us", lines: ["123 Smile Avenue", "Ahmedabad, Gujarat 380001"] },
                { icon: Clock, title: "Hours", lines: ["Mon–Fri: 8 AM – 7 PM", "Sat: 9 AM – 3 PM", "Sun: Closed"] },
                { icon: Phone, title: "Call Us", lines: ["+91 91234 56789"], isPhone: true },
                { icon: Mail, title: "Email", lines: ["hello@dentcareplus.in"] },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-11 h-11 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#00695c]" />
                  </div>
                  <div>
                    <div className="font-body font-bold text-base text-navy dark:text-white mb-1">{item.title}</div>
                    {item.lines.map((l) =>
                      (item as any).isPhone ? (
                        <a key={l} href={`tel:${l.replace(/[^+\d]/g, "")}`} className="block text-sm text-navy/60 font-body hover:text-navy transition-colors dark:text-white">{l}</a>
                      ) : (
                        <div key={l} className="text-sm text-navy/60 font-body dark:text-white">{l}</div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
