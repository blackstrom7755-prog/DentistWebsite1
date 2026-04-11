import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:bg-none">
      <div className="absolute inset-0 dark:block hidden">
        <img
          src="/hero-dentist.jpg"
          alt="Modern dental clinic with friendly dentist"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </div>

      {/* Light mode overlay */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-deep/10 to-primary/10 opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-mint-deep/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-body font-medium text-navy dark:text-white">
              Rated 4.9/5 from 500+ patients
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up text-navy dark:text-white" style={{ animationDelay: "0.3s" }}>
            <span className="text-mint-deep dark:text-accent">Advanced Dental Excellence in Ahmedabad.</span>
          </h1>

          <p className="text-lg md:text-xl font-body max-w-lg mb-8 opacity-0 animate-fade-up text-navy/80 dark:text-white" style={{ animationDelay: "0.5s" }}>
            Experience world-class dental implants and aesthetic smile makeovers with Ahmedabad's most trusted specialists. Precision care designed for your perfect smile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <Button size="lg" className="bg-mint-deep hover:bg-mint-deep/90 text-white dark:bg-accent/80 dark:hover:bg-accent/90 text-base px-8 py-6 shadow-md dark:shadow-glow border border-transparent dark:border-accent/30" asChild>
              <a href="#contact">
                Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-navy/30 text-navy dark:border-white/20 dark:text-white bg-navy/5 dark:bg-white/5 hover:bg-navy/10 dark:hover:bg-white/15 text-base px-8 py-6" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
            {[
              { num: "15+", label: "Years Experience" },
              { num: "10K+", label: "Happy Patients" },
              { num: "25+", label: "Award-Winning" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-display font-bold text-mint-deep dark:text-accent">{s.num}</div>
                <div className="text-xs md:text-sm text-navy/70 dark:text-white font-body font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating book button on mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button size="lg" className="bg-mint-deep hover:bg-mint-deep/90 text-white dark:bg-accent dark:text-accent-foreground shadow-lg dark:shadow-glow rounded-full px-6 py-6" asChild>
          <a href="#contact">Book Now</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
