import { Star, Quote, Award, GraduationCap, Users, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    quote: "The root canal treatment was completely painless. Dr. Shah's use of modern laser technology made a world of difference. Best dental experience in Ahmedabad!",
    rating: 5,
  },
  {
    name: "Rajesh Mehta",
    quote: "Highly professional staff and a state-of-the-art clinic. My dental implants feel completely natural. The attention to detail is truly impressive.",
    rating: 5,
  },
  {
    name: "Emily Richardson",
    quote: "I visited from Satellite for Invisalign treatment. The 3D scanning technology and the level of care were equal to any top-tier clinic internationally.",
    rating: 5,
  },
];

const TrustSections = () => {
  return (
    <div className="space-y-24 py-20 pb-28 bg-white dark:bg-[#0a0f16]">
      {/* ── Meet the Doctor ── */}
      <section id="doctor" className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Doctor Portrait */}
          <div className="relative group perspective-1000">
            <div className="doctor-glow md:max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105">
                <img
                  src="/doctor-arpit.png"
                  alt="Dr. Arpit Shah - Specialist Orthodontist"
                  className="w-full h-auto object-cover"
                  width={600}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-semibold tracking-wider text-[hsl(168,80%,65%)] uppercase mb-1">Lead Specialist</p>
                    <h3 className="text-xl font-bold font-display">Dr. Arpit Shah</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Bio */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-body font-semibold text-mint-deep dark:text-[hsl(168,80%,65%)] tracking-widest uppercase mb-4 block">
                The Expert Behind Your Smile
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy dark:text-white mb-6">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy/60 dark:from-white dark:to-white/60">Dr. Arpit Shah</span>
              </h2>
              <p className="text-navy/70 dark:text-white/70 font-body text-lg leading-relaxed max-w-xl">
                With a passion for creating perfect smiles and over 15 years of clinical excellence, Dr. Arpit Shah is a renowned name in orthodontic and cosmetic dentistry. He combines advanced global technologies with a gentle, patient-first approach.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 max-w-md">
              {[
                { icon: GraduationCap, title: "MDS in Orthodontics", desc: "Specialist in Braces & Aligners" },
                { icon: Award, title: "University Gold Medalist", desc: "Recognized for Academic Excellence" },
                { icon: Users, title: "15+ Years Experience", desc: "Treated over 10,000+ happy patients" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 hover:bg-navy/10 dark:hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-mint-deep/10 dark:bg-[hsl(168,80%,65%,0.1)] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-mint-deep dark:text-[hsl(168,80%,65%)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy dark:text-white text-sm">{item.title}</h4>
                    <p className="text-navy/40 dark:text-white/40 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Patient Testimonials ── */}
      <section id="reviews" className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-body font-semibold text-mint-deep dark:text-[hsl(168,80%,65%)] tracking-widest uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy dark:text-white">
            What Our Patients <span className="text-navy/40 dark:text-white/40 italic font-light">Say</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <div key={index} className="trust-card rounded-2xl p-8 flex flex-col group">
              <Quote className="w-10 h-10 text-mint-deep dark:text-[hsl(168,80%,65%)] opacity-20 mb-6 group-hover:opacity-40 transition-opacity" />
              
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[hsl(40,90%,60%)] text-[hsl(40,90%,60%)]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white font-body text-base leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>

              {/* Patient Badge */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{t.name.charAt(0)}</span>
                  </div>
                  <span className="font-semibold text-sm text-white">{t.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-[hsl(168,80%,60%)]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrustSections;
