import { Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingBookButton = () => {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 sm:w-auto sm:px-6 rounded-full bg-primary text-white shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
      aria-label="Book Appointment"
    >
      <Calendar className="w-6 h-6" />
      <span className="hidden sm:inline font-medium">Book Appointment</span>
    </a>
  );
};

export default FloatingBookButton;
