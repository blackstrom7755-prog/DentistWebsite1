import { Star, Quote, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    location: "S.G. Highway, Ahmedabad",
    image: "/patient-1.png",
    rating: 5,
    quote:
      "Hands down the best dental clinic on S.G. Highway! I was so nervous about my root canal, but the team made it completely painless. The laser technology they use is next-level — I walked out the same day with zero discomfort. Highly recommended to anyone in Ahmedabad looking for world-class dental care.",
    treatment: "Root Canal Treatment",
  },
  {
    name: "Rajesh Mehta",
    location: "Prahlad Nagar, Ahmedabad",
    image: "/patient-2.png",
    rating: 5,
    quote:
      "I've been to many dental clinics over the years, but DentCare+ is in a league of its own. The professionalism, the modern equipment, and the attention to detail during my implant procedure were outstanding. My new teeth look and feel completely natural. The staff treated me like family.",
    treatment: "Dental Implants",
  },
  {
    name: "Emily Richardson",
    location: "Bodakdev, Ahmedabad",
    image: "/patient-3.png",
    rating: 5,
    quote:
      "I got my Invisalign treatment here after moving to Ahmedabad, and I'm blown away by the quality. The 3D scanning was so much better than traditional molds. The clinic feels like a premium international practice — spotless, high-tech, and incredibly welcoming. Worth every bit.",
    treatment: "Invisalign Treatment",
  },
  {
    name: "Arjun Patel",
    location: "Satellite, Ahmedabad",
    image: "/patient-4.png",
    rating: 5,
    quote:
      "I brought my entire family here for check-ups and cleanings. The pediatric care for my kids was fantastic — they actually enjoyed their visit! The whitening session I did gave me results I never thought possible. Six shades brighter in one sitting. This clinic is the real deal.",
    treatment: "Teeth Whitening",
  },
];

const PatientTestimonials = () => {
  return (
    <section id="patient-stories" className="relative py-20 md:py-28 overflow-hidden bg-white dark:bg-[#0a0f16]">
      {/* Dark gradient background */}
      <div className="absolute inset-0 dark:block hidden bg-gradient-to-br from-[hsl(210,80%,6%)] via-[hsl(210,60%,10%)] to-[hsl(220,50%,8%)]" />

      {/* Subtle ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(168,80%,50%)] opacity-[0.04] dark:opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(210,80%,45%)] opacity-[0.05] dark:opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold text-mint-deep dark:text-[hsl(168,80%,65%)] tracking-widest uppercase mb-3 block">
            Patient Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy dark:text-white mb-4">
            Real Smiles, Real{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-deep to-mint-deep/70 dark:from-[hsl(168,80%,70%)] dark:to-[hsl(168,60%,55%)]">
              Results
            </span>
          </h2>
          <p className="text-navy/50 dark:text-white/50 font-body text-base md:text-lg max-w-lg mx-auto">
            Don't just take our word for it — hear from patients who trust us
            with their smiles every day.
          </p>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[hsl(40,90%,60%)] text-[hsl(40,90%,60%)]" />
              ))}
            </div>
            <span className="font-body text-sm text-white/40">
              4.9/5 Average Patient Rating
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className="group testimonial-card rounded-2xl p-6 flex flex-col transition-all duration-500 hover:translate-y-[-4px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[hsl(168,80%,65%)] opacity-30 mb-4 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[hsl(40,90%,60%)] text-[hsl(40,90%,60%)]"
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-white/70 font-body text-sm leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              {/* Treatment Badge */}
              <div className="mb-5">
                <span className="inline-block text-[10px] font-semibold font-body uppercase tracking-wider text-[hsl(168,80%,65%)] bg-[hsl(168,80%,65%,0.08)] border border-[hsl(168,80%,65%,0.15)] rounded-full px-3 py-1">
                  {t.treatment}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={`${t.name} - verified patient`}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[hsl(168,80%,65%,0.2)] group-hover:ring-[hsl(168,80%,65%,0.4)] transition-all duration-300"
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                  {/* Online-style verified dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(168,80%,50%)] border-2 border-[hsl(210,50%,12%)] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm font-body text-white truncate">
                      {t.name}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[hsl(168,80%,60%)] flex-shrink-0" />
                  </div>
                  <div className="text-xs text-white/35 font-body truncate">
                    {t.location}
                  </div>
                </div>
              </div>

              {/* Verified Patient Label */}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                  <path d="M5 0L6.12 1.76L8.09 1.55L7.5 3.45L9.05 4.84L7.22 5.68L7.07 7.66L5 7.07L2.93 7.66L2.78 5.68L0.95 4.84L2.5 3.45L1.91 1.55L3.88 1.76L5 0Z" fill="hsl(168,80%,55%)" />
                </svg>
                <span className="text-[10px] font-body text-white/30 uppercase tracking-wider">
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials;
