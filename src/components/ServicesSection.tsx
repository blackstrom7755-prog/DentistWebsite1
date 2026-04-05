import { Smile, Shield, Sparkles, Heart, Stethoscope, Baby } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional whitening for a radiant, confident smile.", price: "From $199" },
  { icon: Shield, title: "Dental Implants", desc: "Permanent tooth replacement with natural-looking results.", price: "From $1,500" },
  { icon: Smile, title: "Invisalign", desc: "Clear aligners for a straighter smile — no metal braces.", price: "From $2,500" },
  { icon: Stethoscope, title: "Root Canal", desc: "Painless root canal treatment with advanced technology.", price: "From $400" },
  { icon: Heart, title: "Cosmetic Veneers", desc: "Custom porcelain veneers for a perfect Hollywood smile.", price: "From $800" },
  { icon: Baby, title: "Pediatric Care", desc: "Gentle, kid-friendly dental care in a fun environment.", price: "From $75" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 gradient-mint">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Our Services</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Comprehensive Dental Solutions
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          From routine check-ups to advanced cosmetic procedures, we offer the full spectrum of modern dentistry.
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
            <span className="text-sm font-semibold font-body text-navy">{s.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
