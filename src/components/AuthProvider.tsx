import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActive, setLastActive] = useState<number>(Date.now());

  const INACTIVITY_THRESHOLD = 10 * 60 * 1000; // 10 minutes in milliseconds

  const handleLogout = async (reason: "expired" | "normal" = "normal") => {
    if (reason === "expired") {
      localStorage.setItem("dentist_session_expired", "true");
    }
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initSession();

    // Re-entry check: logic for tab closure timeout
    const checkReEntryTimeout = () => {
      const exitTimestamp = localStorage.getItem("dentist_exit_timestamp");
      if (exitTimestamp) {
        const elapsed = Date.now() - parseInt(exitTimestamp, 10);
        if (elapsed > INACTIVITY_THRESHOLD) {
          handleLogout("expired");
        }
        localStorage.removeItem("dentist_exit_timestamp");
      }
    };
    checkReEntryTimeout();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    });

    // Activity tracking & Inactivity timer
    const updateActivity = () => {
      const now = Date.now();
      setLastActive(now);
      localStorage.setItem("dentist_last_active", now.toString());
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("dentist_exit_timestamp", Date.now().toString());
      } else {
        // When coming back, check if the "hidden" period was too long
        const exitTimestamp = localStorage.getItem("dentist_exit_timestamp");
        if (exitTimestamp) {
          const elapsed = Date.now() - parseInt(exitTimestamp, 10);
          if (elapsed > INACTIVITY_THRESHOLD) {
            handleLogout("expired");
          }
          localStorage.removeItem("dentist_exit_timestamp");
        }
      }
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("dentist_exit_timestamp", Date.now().toString());
    });

    const inactivityInterval = setInterval(() => {
      if (session) {
        const now = Date.now();
        const elapsed = now - lastActive;
        if (elapsed > INACTIVITY_THRESHOLD) {
          handleLogout("expired");
        }
      }
    }, 30000); // Check every 30 seconds

    return () => {
      mounted = false;
      subscription.unsubscribe();
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(inactivityInterval);
    };
  }, [session, lastActive]);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
