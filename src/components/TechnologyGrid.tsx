import techScanner from "@/assets/tech-scanner.jpg";
import techLaser from "@/assets/tech-laser.jpg";
import { Scan, Zap, ShieldCheck, Cpu } from "lucide-react";

const technologies = [
  {
    icon: Scan,
    title: "Digital 3D Scanning",
    desc: "Ultra-precise intraoral scanning replaces messy impressions — accurate to 20 microns.",
    image: techScanner,
  },
  {
    icon: Zap,
    title: "Laser Dentistry",
    desc: "Minimally invasive soft-tissue laser for painless gum treatments and faster healing.",
    image: techLaser,
  },
  {
    icon: ShieldCheck,
    title: "AI Diagnostics",
    desc: "Artificial-intelligence powered X-ray analysis for early cavity and disease detection.",
    image: null,
  },
  {
    icon: Cpu,
    title: "CAD/CAM Same-Day Crowns",
    desc: "Computer-designed crowns milled in-house — get a perfect crown in a single visit.",
    image: null,
  },
];

const TechnologyGrid = () => (
  <section id="technology" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Innovation</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Cutting-Edge Technology
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          We invest in the latest dental technology so you get faster, safer, and more comfortable treatments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {technologies.map((t) => (
          <div
            key={t.title}
            className="group relative rounded-2xl overflow-hidden border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
          >
            {t.image ? (
              <div className="h-48 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            ) : (
              <div className="h-48 gradient-hero flex items-center justify-center">
                <t.icon className="w-16 h-16 text-accent opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
            )}
            <div className="p-6 gradient-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <t.icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
              </div>
              <p className="text-muted-foreground font-body text-sm">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyGrid;
