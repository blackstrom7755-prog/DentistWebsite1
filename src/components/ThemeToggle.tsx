import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-11 h-11 rounded-full bg-slate-100/80 dark:bg-white/8 border border-slate-300/60 dark:border-white/15 hover:bg-slate-200/80 dark:hover:bg-white/15 transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-md"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon - Light Mode */}
        <Sun 
          className={`w-5 h-5 text-amber-500 transition-all duration-500 absolute
            ${theme === "dark" 
              ? "translate-y-12 opacity-0 rotate-90 scale-0" 
              : "translate-y-0 opacity-100 rotate-0 scale-100"
            }
          `} 
        />
        
        {/* Moon Icon - Dark Mode */}
        <Moon 
          className={`w-5 h-5 text-indigo-400 transition-all duration-500 absolute
            ${theme === "light" 
              ? "-translate-y-12 opacity-0 -rotate-90 scale-0" 
              : "translate-y-0 opacity-100 rotate-0 scale-100"
            }
          `} 
        />
      </div>
      
      {/* Glassmorphism Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </Button>
  );
};

export default ThemeToggle;
