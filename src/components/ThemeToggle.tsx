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
      className="relative w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 hover:bg-slate-300/50 dark:hover:bg-white/10 transition-all duration-300 group overflow-hidden"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon */}
        <Sun 
          className={`w-5 h-5 text-amber-500 transition-all duration-500 absolute
            ${theme === "dark" 
              ? "translate-y-12 opacity-0 rotate-90" 
              : "translate-y-0 opacity-100 rotate-0"
            }
          `} 
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`w-5 h-5 text-indigo-400 transition-all duration-500 absolute
            ${theme === "light" 
              ? "-translate-y-12 opacity-0 -rotate-90" 
              : "translate-y-0 opacity-100 rotate-0"
            }
          `} 
        />
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );
};

export default ThemeToggle;
