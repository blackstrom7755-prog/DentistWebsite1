import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent">
      {/* 1. Light Mode Background */}
      <div className="absolute inset-0 dark:hidden z-0 bg-white">
        <img
          src="/social-media-post-website-banner-dental-clinic_1151123-57727.jpg.avif" // Ensure this matches your public folder filename
          alt="Premium Dental Clinic"
          className="w-full h-full object-cover object-center sm:object-right md:object-center"
        />
        {/* Increased opacity for mobile readability */}
        <div className="absolute inset-0 bg-white/40 md:bg-white/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Dark Mode Background */}
      <div className="absolute inset-0 hidden dark:block z-0 bg-[#0a0f16]">
        <img
          src="/social-media-post-website-banner-dental-clinic_1151123-57727.jpg.avif"
          alt="Premium Dental Clinic"
          className="w-full h-full object-cover object-center sm:object-right md:object-center brightness-[0.4] contrast-[1.1]"
        />
        {/* Solid overlay for mobile, slight blur for desktop */}
        <div className="absolute inset-0 bg-zinc-950/40 md:bg-zinc-950/40 backdrop-blur-[1px]" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span className="text-sm font-body font-medium text-navy dark:text-white">
              Rated 4.9/5 from 500+ patients in Ahmedabad
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up text-navy dark:text-white" style={{ animationDelay: "0.3s" }}>
            <span className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-navy dark:text-[#2DD4BF]">
              Most Trusted Dental Clinic in Ahmedabad
            </span>
          </h1>

          <p className="text-lg md:text-xl font-body max-w-lg mb-8 opacity-0 animate-fade-up text-navy/80 dark:text-white/90" style={{ animationDelay: "0.5s" }}>
            Experience world-class dental implants and aesthetic smile makeovers with Ahmedabad's most trusted specialists. Precision care designed for your perfect smile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <Button 
              size="lg" 
              className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white shadow-md dark:shadow-glow border border-transparent" 
              asChild
            >
              <a href="#contact">
                Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-[#0D9488]/30 text-[#0D9488] dark:border-white/20 dark:text-white bg-transparent hover:bg-[#0D9488]/10 transition-all text-base px-8 py-6" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>

          {/* Experience Stats */}
          <div className="mt-12 flex items-center gap-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
            {[
              { num: "15+", label: "Years Experience" },
              { num: "10K+", label: "Happy Patients" },
              { num: "25+", label: "Award-Winning" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-display font-bold text-[#0D9488] dark:text-[#2DD4BF]">
                  {s.num}
                </div>
                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-body font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;