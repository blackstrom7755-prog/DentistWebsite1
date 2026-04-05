import doctorImg from "@/assets/doctor-portrait.jpg";
import { Award, GraduationCap, Users } from "lucide-react";

const DoctorSection = () => (
  <section id="doctor" className="py-20 md:py-28 gradient-mint">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={doctorImg}
              alt="Dr. Alex Mitchell — Lead Dentist"
              className="w-full h-auto object-cover"
              loading="lazy"
              width={800}
              height={1024}
            />
          </div>
          <div className="absolute -bottom-6 -right-4 md:-right-6 bg-card rounded-xl shadow-elevated p-4 border border-border/50">
            <div className="text-2xl font-display font-bold text-foreground">15+</div>
            <div className="text-xs text-muted-foreground font-body">Years of Excellence</div>
          </div>
        </div>

        <div>
          <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Meet Your Dentist</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Dr. Alex Mitchell
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
            With over 15 years of experience and advanced training in cosmetic and implant
            dentistry, Dr. Mitchell combines clinical precision with genuine compassion
            to deliver exceptional results for every patient.
          </p>

          <div className="space-y-4">
            {[
              { icon: GraduationCap, text: "Harvard School of Dental Medicine" },
              { icon: Award, text: "Board Certified — American Board of Prosthodontics" },
              { icon: Users, text: "10,000+ Successful Procedures" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-navy" />
                </div>
                <span className="font-body text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DoctorSection;
