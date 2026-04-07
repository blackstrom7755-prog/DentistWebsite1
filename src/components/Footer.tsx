import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/10 py-16 md:py-20 overflow-hidden relative">
    {/* Subtle glow effect */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand */}
        <div className="space-y-6">
          <a href="#" className="font-display text-3xl font-bold tracking-tight text-white flex items-center gap-2 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">D</span>
            </span>
            <span>DentCare<span className="text-accent">+</span></span>
          </a>
          <p className="text-white font-body text-base leading-relaxed max-w-xs">
            Precision dentistry with a personal touch. Elevating dental care with technology-driven clinical excellence.
          </p>
          <div className="pt-2">
            <GoogleReviewBadge />
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="font-display font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">
            Services
          </h4>
          <ul className="space-y-4">
            {["Teeth Whitening", "Dental Implants", "Invisalign", "Root Canal"].map((s) => (
              <li key={s}>
                <a 
                  href="#services" 
                  className="text-slate-400 hover:text-white transition-all duration-300 font-body text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-accent group-hover:w-4 transition-all" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Clinic / Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">
            The Clinic
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Our Doctor", href: "#doctor" },
              { label: "Technology", href: "#technology" },
              { label: "Reviews", href: "#reviews" },
              { label: "Contact", href: "#contact" }
            ].map((s) => (
              <li key={s.label}>
                <a 
                  href={s.href} 
                  className="text-white/60 hover:text-white transition-all duration-300 font-body text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-8">
          <h4 className="font-display font-bold text-white uppercase tracking-[0.2em] text-xs mb-8">
            Contact Us
          </h4>
          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="text-slate-400 font-body text-sm leading-relaxed group-hover:text-white transition-colors">
                123 Smile Avenue, Suite 500<br />New York, NY 10001
              </p>
            </div>
            
            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <a 
                href="tel:+1234567890" 
                className="text-slate-400 font-body text-sm hover:text-white transition-all self-center"
              >
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <a 
                href="mailto:hello@dentcareplus.com" 
                className="text-slate-400 font-body text-sm hover:text-white transition-all self-center"
              >
                hello@dentcareplus.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-white/40 font-body tracking-wide">
          © 2026 <span className="text-white font-medium">DentCare+</span>. Clinical Excellence in Manhattan.
        </p>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Clinical Standards"].map(item => (
            <a 
              key={item} 
              href="#" 
              className="text-xs text-white/40 hover:text-white transition-colors font-body underline-offset-4 hover:underline"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
