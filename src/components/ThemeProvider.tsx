import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check if user has a saved preference in their browser
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-theme");
      if (saved) {
        return (saved as Theme);
      }
    }
    
    // 2. Default to light mode for all new visitors to match the brand
    return "light"; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Apply the theme class to the <html> tag for Tailwind dark: modifiers
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    // Save the preference so the user doesn't have to toggle it again
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};