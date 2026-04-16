import { MessageCircle } from "lucide-react";

const FloatingWhatsAppButton = () => {
  return (
    <button
      onClick={() => window.open('https://wa.me/919876543210', '_blank')}
      className="fixed bottom-24 sm:bottom-[5.5rem] left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="WhatsApp Us"
    >
      {/* Fallback to MessageCircle if we don't have WhatsApp icon */}
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default FloatingWhatsAppButton;
