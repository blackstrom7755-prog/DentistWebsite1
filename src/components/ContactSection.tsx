import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Phone, Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", preferredTime: "", serviceType: "", appointmentDate: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        patient_name: form.name,
        phone: form.phone,
        email: form.email || null,
        appointment_date: form.appointmentDate || null,
        appointment_time: form.preferredTime || null,
        service_type: form.serviceType || null,
        status: "pending",
      });
      
      if (error) {
        console.error(error);
        throw error;
      }
      
      toast.success("Request Sent! Dr. will review and confirm your slot shortly.");
      setForm({ name: "", phone: "", email: "", message: "", preferredTime: "", serviceType: "", appointmentDate: "" });
    } catch (err: any) {
      console.error("Failed to save appointment:", err);
      alert(err.message || "An error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 gradient-mint">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Get in Touch</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Visit
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-6">
            Ready for your best smile? Fill out the form and we'll get back to you within 30 minutes during clinic hours.
          </p>
          <GoogleReviewBadge />
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-3 bg-card rounded-2xl shadow-elevated p-6 md:p-8 border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Full Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Phone *</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (234) 567-890" required maxLength={20} type="tel" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Email</label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" maxLength={255} type="email" />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Service Type</label>
                  <Select value={form.serviceType} onValueChange={(v) => setForm({ ...form, serviceType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Checkup">Checkup</SelectItem>
                      <SelectItem value="Cleaning">Cleaning</SelectItem>
                      <SelectItem value="Whitening">Whitening</SelectItem>
                      <SelectItem value="Root Canal">Root Canal</SelectItem>
                      <SelectItem value="Dental Implants">Dental Implants</SelectItem>
                      <SelectItem value="Braces / Aligners">Braces / Aligners</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Preferred Date</label>
                  <Input value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Preferred Time</label>
                  <Select value={form.preferredTime} onValueChange={(v) => setForm({ ...form, preferredTime: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</SelectItem>
                      <SelectItem value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</SelectItem>
                      <SelectItem value="Evening (4 PM – 7 PM)">Evening (4 PM – 7 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Additional Notes</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any specific concerns or requests..." rows={3} maxLength={1000} />
              </div>
              <Button type="submit" className="w-full py-6 text-base" disabled={sending}>
                {sending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : <><Send className="w-4 h-4 mr-2" /> Send Request</>}
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-6">
            {[
              { icon: MapPin, title: "Visit Us", lines: ["123 Smile Avenue", "New York, NY 10001"] },
              { icon: Clock, title: "Hours", lines: ["Mon–Fri: 8 AM – 7 PM", "Sat: 9 AM – 3 PM", "Sun: Closed"] },
              { icon: Phone, title: "Call Us", lines: ["+1 (234) 567-890"], isPhone: true },
              { icon: Mail, title: "Email", lines: ["hello@dentcareplus.com"] },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="font-body font-semibold text-sm text-foreground mb-1">{item.title}</div>
                  {item.lines.map((l) =>
                    (item as any).isPhone ? (
                      <a key={l} href={`tel:${l.replace(/[^+\d]/g, "")}`} className="block text-sm text-muted-foreground font-body hover:text-primary transition-colors">{l}</a>
                    ) : (
                      <div key={l} className="text-sm text-muted-foreground font-body">{l}</div>
                    )
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] transition-colors shadow-soft"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-card">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-body font-semibold text-sm text-card">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
