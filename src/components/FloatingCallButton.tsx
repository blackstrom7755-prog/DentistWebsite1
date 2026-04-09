import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingCallButton = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <a
      href="tel:+919123456789"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};

export default FloatingCallButton;
