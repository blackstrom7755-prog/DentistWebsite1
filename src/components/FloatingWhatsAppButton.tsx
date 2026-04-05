import { MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingWhatsAppButton = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[6.5rem] left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsAppButton;
