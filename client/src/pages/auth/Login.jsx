import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Logo from "../../components/ui/Logo.jsx";
import { useAuth } from "../../context/useAuth.js";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("admin@vibnex.dev");
  const [password, setPassword] = useState("VibnexAdmin2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await login(identifier, password);
      toast.success("Welcome back to VIBNEX!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    try {
      const demoEmail = provider === "google" ? "google.user@vibnex.dev" : "github.user@vibnex.dev";
      const demoName = provider === "google" ? "Google User" : "GitHub Developer";
      const { data } = await api.post("/auth/social", {
        provider,
        email: demoEmail,
        name: demoName,
      });

      if (data?.token) {
        localStorage.setItem("token", data.token);
        toast.success(`Logged in with ${provider === "google" ? "Google" : "GitHub"}!`);
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("Social login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Background Cyan Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center bg-[#0E1520]/80 border border-slate-800/80 rounded-[32px] p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Left Side: Floating Nature & Vibe Cards (From Design Mockup) */}
        <div className="hidden md:flex flex-col items-center justify-center relative min-h-[420px]">
          <div className="w-56 h-40 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-xl shadow-cyan-500/20 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Mountain landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-56 h-40 rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-2xl shadow-cyan-500/25 transform rotate-6 -mt-10 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80"
              alt="Forest pine trees"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Welcome Back Form */}
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="flex justify-center sm:justify-start">
              <Logo wordmark={false} className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-400">Log in to continue to VIBNEX.</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email or Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-cyan-500"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Log In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-[#0E1520] px-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                or continue with
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth("google")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-semibold text-white transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth("github")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-semibold text-white transition-all"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 pt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
