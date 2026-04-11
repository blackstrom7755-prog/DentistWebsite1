import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#transformations" },
  { label: "Technology", href: "#technology" },
  { label: "Our Doctor", href: "#doctor" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-soft dark:shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-display text-xl md:text-2xl font-bold text-navy dark:text-mint-deep">
          DentCare<span className="text-mint-deep dark:text-accent">+</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy/60 dark:text-foreground/70 hover:text-navy dark:hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-medium text-navy/50 dark:text-muted-foreground hover:text-navy dark:hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> +91 98765 43210
          </a>
          <ThemeToggle />
          <Button asChild>
            <a href="#contact">Book Appointment</a>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-navy dark:text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 pb-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <Button className="w-full mt-3" asChild>
            <a href="#contact" onClick={() => setOpen(false)}>Book Appointment</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
