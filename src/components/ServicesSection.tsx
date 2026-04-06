import { Smile, Shield, Sparkles, Heart, Stethoscope, Baby } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional whitening for a radiant, confident smile." },
  { icon: Shield, title: "Dental Implants", desc: "Permanent tooth replacement with natural-looking results." },
  { icon: Smile, title: "Invisalign", desc: "Clear aligners for a straighter smile — no metal braces." },
  { icon: Stethoscope, title: "Root Canal", desc: "Painless root canal treatment with advanced technology." },
  { icon: Heart, title: "Cosmetic Veneers", desc: "Custom porcelain veneers for a perfect Hollywood smile." },
  { icon: Baby, title: "Pediatric Care", desc: "Gentle, kid-friendly dental care in a fun environment." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 gradient-mint">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16 px-4">
        <span className="text-sm font-body font-bold text-white tracking-[0.2em] uppercase mb-4 block drop-shadow-sm">
          Our Services
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none drop-shadow-md">
          Comprehensive Dental Solutions
        </h2>
        <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
          From routine check-ups to advanced cosmetic procedures, we offer the full spectrum of modern dentistry with precision care.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group gradient-card rounded-xl p-6 md:p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
          >
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors">
              <s.icon className="w-6 h-6 text-navy" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground font-body text-sm mb-4">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
