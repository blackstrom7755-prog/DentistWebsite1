import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Smile, 
  Activity, 
  Zap, 
  HeartPulse,
  Stethoscope,
  Scaling,
  Baby,
  ShieldAlert
} from "lucide-react";

type Service = {
  title: string;
  icon: JSX.Element;
  bgImage?: string; 
  fullDescription: string;
  benefits: string[];
  procedure: string;
};

const services: Service[] = [
  {
    title: "Teeth Whitening",
    icon: <Sparkles className="w-8 h-8" />,
    bgImage: "/whitening-bg.jpg",
    fullDescription: "Our clinical whitening system uses proprietary laser technology to break down deep-seated stains safely. We ensure zero sensitivity and immediate results.",
    benefits: ["Results in 60 minutes", "Up to 8 shades lighter", "Enamel-safe professional gel", "Long-lasting brightness"],
    procedure: "We apply a specialized peroxide gel activated by blue light to accelerate whitening safely."
  },
  {
    title: "Invisible Braces",
    icon: <Smile className="w-8 h-8" />,
    bgImage: "/aligner-bg.jpg",
    fullDescription: "Align your teeth comfortably and virtually invisibly using custom-designed clear aligners created from advanced 3D scanning technology.",
    benefits: ["Removable for eating & brushing", "Virtually invisible appearance", "Fewer office visits required", "Smooth comfort"],
    procedure: "We conduct an intraoral scan to create a 3D model and print custom alignment trays."
  },
  {
    title: "Dental Implants",
    icon: <Shield className="w-8 h-8" />,
    bgImage: "shutterstock_567400411.jpg.webp",
    fullDescription: "Replace missing teeth with medical-grade titanium implants that acting as artificial roots, fusing with your jawbone.",
    benefits: ["Prevents bone loss", "Looks & feels like a real tooth", "Restores 100% chewing power", "Lasts a lifetime"],
    procedure: "A minor surgical procedure places the implant, followed by a fusion period with the jawbone."
  },
  {
    title: "Painless Root Canal",
    icon: <Activity className="w-8 h-8" />,
    bgImage: "/root-canal-treatment.jpg",
    fullDescription: "Using rotary endodontic technology, we complete root canals faster and with significantly less discomfort, preserving your natural tooth.",
    benefits: ["Immediate pain relief", "Preserves natural tooth structure", "Efficient single-visit therapy", "High success rate"],
    procedure: "We clean and seal the canal system using precise digital tools to save the tooth."
  },
  {
    title: "Composite Bonding",
    icon: <Scaling className="w-8 h-8" />,
    bgImage: "/understand-dental-bonding.jpg",
    fullDescription: "A cosmetic procedure where tooth-colored resin is sculpted and bonded to the tooth to repair chips, cracks, or close gaps.",
    benefits: ["Quick single visit", "No tooth reduction", "Matches natural shade", "Affordable smile makeover"],
    procedure: "The resin is applied, sculpted, hardened with a specialized light, and polished to a natural shine."
  },
  {
    title: "Full Mouth Rehab",
    icon: <Stethoscope className="w-8 h-8" />,
    bgImage: "/what-is-full-mouth-rehabilitation.jpg",
    fullDescription: "A personalized treatment plan sequence designed to restore health, function, and aesthetics for the entire mouth.",
    benefits: ["Complete transformation", "Restores bite alignment", "Improves facial structure", "Total oral health"],
    procedure: "We conduct a full smile analysis to sequence restorative treatments like implants and crowns."
  },
  {
    title: "Pediatric Dentistry",
    icon: <Baby className="w-8 h-8" />,
    bgImage: "/Pediatric-dentistry-1024x484.jpg",
    fullDescription: "Specialized care focused on pediatric needs, ensuring a positive, anxiety-free experience for lifelong oral health.",
    benefits: ["Kid-friendly environment", "Preventative sealants", "Growth monitoring", "Positive, anxiety-free approach"],
    procedure: "Regular check-ups include gentle cleaning, fluoride application, and proper hygiene education."
  },
  {
    title: "Emergency Dental Care",
    icon: <ShieldAlert className="w-8 h-8" />,
    bgImage: "/dental-emergency.jpg",
    fullDescription: "Urgent care priority scheduling for severe pain, dental trauma, knocked-out teeth, or broken restorations.",
    benefits: ["Same-day appointments", "Immediate pain relief", "Expert trauma management", "Urgent stabilization"],
    procedure: "The focus is stabilizing injury, relieving acute pain, and preventing further complications."
  }
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0a0f16]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-[#0D9488] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-6 font-display">
            Treatments At DentCare+
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We offer a wide range of dental services to help you achieve a healthy, beautiful smile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group flex flex-col h-fit rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* 1. Image Header */}
              <div className="relative h-44 overflow-hidden">
                {service.bgImage ? (
                  <img 
                    src={service.bgImage} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-[#0D9488]">
                    {service.icon}
                  </div>
                )}
              </div>

              {/* 2. Content Area - Tightened padding and spacing */}
              <div className="p-5 flex flex-col space-y-2"> 
                {/* Icon Accent */}
                <div className="text-[#0D9488] inline-block p-2 rounded-lg bg-[#0D9488]/10 w-fit">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-bold text-navy dark:text-white leading-tight">
                  {service.title}
                </h3>
                
                {/* Read More Button - Bottom of the card */}
                <button 
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-2 text-[#0D9488] font-bold text-[10px] uppercase tracking-widest hover:gap-4 transition-all pb-1"
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-[#0d0d0d] border-[#0D9488]/20 shadow-2xl p-0 overflow-hidden">
          {selectedService && (
            <div className="flex flex-col">
              <div className="bg-[#0D9488] p-8 text-white">
                <div className="mb-4 opacity-80">{selectedService.icon}</div>
                <DialogHeader>
                  <DialogTitle className="text-3xl md:text-4xl font-bold text-white">
                    {selectedService.title}
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-[#0D9488] font-bold text-xs uppercase tracking-[0.2em] mb-3">Service Description</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {selectedService.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[#0D9488] font-bold text-xs uppercase tracking-[0.2em] mb-4">Patient Benefits</h4>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <Zap className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#0D9488] font-bold text-xs uppercase tracking-[0.2em] mb-4">The Procedure</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                      {selectedService.procedure}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedService(null)}
                    className="w-full bg-[#0D9488] hover:bg-[#0b7a6f] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#0D9488]/20 flex items-center justify-center gap-2"
                  >
                    <HeartPulse className="w-5 h-5" />
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;