import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      // If no session from context, don't even bother verifying yet
      if (!session) {
        setIsVerified(false);
        return;
      }

      // Hard fail-safe: Check with Supabase server instead of relying on localStorage session
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error("Session verification failed. Security breach prevented.");
        await supabase.auth.signOut();
        setIsVerified(false);
      } else {
        setIsVerified(true);
      }
    };

    if (!loading) {
      verifySession();
    }
  }, [session, loading]);

  // Show full-screen spinner while either context loading OR our fail-safe verification is in progress
  if (loading || (session && isVerified === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse" />
            <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-display font-semibold text-white tracking-wide">
              Secure Access
            </h2>
            <p className="text-sm text-slate-400 font-body">
              Verifying your clinical credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Hard redirect if not verified or no session
  if (!session || isVerified === false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
