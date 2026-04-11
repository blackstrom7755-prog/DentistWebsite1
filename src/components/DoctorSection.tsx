import { Award, GraduationCap, Users } from "lucide-react";

const DoctorSection = () => (
  <section id="doctor" className="py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
    {/* This style block forces the color for this specific ID */}
    <style dangerouslySetInnerHTML={{ __html: `
      #expert-label { color: #0D9488 !important; }
    `}} />
    
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ... image code ... */}
        <div>
          <span 
          style={{ color: '#0D9488' }} 
          className="text-2xl md:text-2xl text-sm font-body font-bold tracking-widest uppercase mb-4 block"
          >
            THE EXPERT BEHIND YOUR SMILE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Dr. Arpit Shah
          </h2>
          {/* ... rest of code ... */}
        </div>
      </div>
    </div>
  </section>
);

export default DoctorSection;