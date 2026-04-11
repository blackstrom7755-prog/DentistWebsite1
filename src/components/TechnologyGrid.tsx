import { Scan, Zap, ShieldCheck, Cpu } from "lucide-react";

const technologies = [
  {
    icon: Scan,
    title: "Digital 3D Scanning",
    desc: "Ultra-precise intraoral scanning replaces messy impressions — accurate to 20 microns.",
    image: "/tech-scanner.jpg",
  },
  {
    icon: Zap,
    title: "Laser Dentistry",
    desc: "Minimally invasive soft-tissue laser for painless gum treatments and faster healing.",
    image: "/tech-laser.jpg",
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
  <section id="technology" className="py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-body font-semibold text-mint-deep dark:text-accent tracking-widest uppercase mb-3 block">Innovation</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-navy dark:text-white mb-4">
          Cutting-Edge Technology
        </h2>
        <p className="text-navy/70 dark:text-white font-body text-lg">
          We invest in the latest dental technology so you get faster, safer, and more comfortable treatments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {technologies.map((t) => (
          <div
            key={t.title}
            className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2"
          >
            {t.image ? (
              <div className="h-48 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            ) : (
              <div className="h-48 bg-zinc-900/80 flex items-center justify-center">
                <t.icon className="w-16 h-16 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <div className="p-6 bg-zinc-950/50 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                  <t.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">{t.title}</h3>
              </div>
              <p className="text-white font-body text-lg leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyGrid;
