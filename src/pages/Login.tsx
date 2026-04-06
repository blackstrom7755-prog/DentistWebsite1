import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShieldCheck, Loader2, Mail, Lock, Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && session) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [session, authLoading, navigate]);

  // Check for expired session
  useEffect(() => {
    const isExpired = localStorage.getItem("dentist_session_expired");
    if (isExpired) {
      toast.error("Session Expired. Please login again to continue.", {
        duration: 5000,
      });
      localStorage.removeItem("dentist_session_expired");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      navigate("/admin-dashboard", { replace: true });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center login-bg">
        <Loader2 className="w-8 h-8 text-white/70 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center login-bg relative overflow-hidden px-4">
      {/* Animated background orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />
      <div className="login-orb login-orb-3" />

      {/* Glassmorphism login card */}
      <div className="w-full max-w-md relative z-10 animate-fade-up">
        <div className="login-glass-card rounded-2xl p-8 md:p-10">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(168,80%,78%)] to-[hsl(210,80%,50%)] mb-4 shadow-lg shadow-[hsl(168,80%,78%,0.3)]">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
              DentCare<span className="text-[hsl(168,80%,78%)]">+</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-3.5 h-3.5 text-[hsl(168,80%,78%,0.7)]" />
              <p className="text-sm text-white/50 font-body tracking-wider uppercase">
                Admin Portal
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[hsl(168,80%,78%,0.7)]" />
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-medium text-white/40 uppercase tracking-wider font-body"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@dentcareplus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  className="login-input pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="text-xs font-medium text-white/40 uppercase tracking-wider font-body"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[hsl(168,80%,78%)] to-[hsl(168,60%,60%)] hover:from-[hsl(168,80%,72%)] hover:to-[hsl(168,60%,54%)] text-[hsl(210,80%,10%)] rounded-xl transition-all duration-300 shadow-lg shadow-[hsl(168,80%,78%,0.25)] hover:shadow-[hsl(168,80%,78%,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Sign In to Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-white/25 mt-6 font-body">
            Secured by Supabase Auth · End-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
