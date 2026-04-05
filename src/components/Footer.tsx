import GoogleReviewBadge from "@/components/GoogleReviewBadge";

const Footer = () => (
  <footer className="gradient-hero py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        <div>
          <a href="#" className="font-display text-2xl font-bold text-primary-foreground">
            DentCare<span className="text-accent">+</span>
          </a>
          <p className="text-primary-foreground/60 font-body text-sm mt-3 leading-relaxed">
            Precision dentistry with a personal touch. Your smile is our passion.
          </p>
          <div className="mt-4">
            <GoogleReviewBadge variant="dark" />
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Services</h4>
          {["Teeth Whitening", "Dental Implants", "Invisalign", "Root Canal"].map((s) => (
            <a key={s} href="#services" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">{s}</a>
          ))}
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Clinic</h4>
          {["About Us", "Technology", "Reviews", "Contact"].map((s) => (
            <a key={s} href={`#${s.toLowerCase().replace(/\s/g, "")}`} className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">{s}</a>
          ))}
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Quick Links</h4>
          <a href="#faq" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">Emergency Care</a>
          <a href="#faq" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">Insurance Info</a>
          <a href="#transformations" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">Before & After</a>
          <a href="#services" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body py-1">Pricing</a>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-3">Contact</h4>
          <p className="text-sm text-primary-foreground/60 font-body">123 Smile Avenue</p>
          <p className="text-sm text-primary-foreground/60 font-body">New York, NY 10001</p>
          <a href="tel:+1234567890" className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body mt-2">+1 (234) 567-890</a>
          <p className="text-sm text-primary-foreground/60 font-body">hello@dentcareplus.com</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40 font-body">© 2026 DentCare+. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors font-body">Privacy Policy</a>
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors font-body">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
