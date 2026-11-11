import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login(email.trim(), password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Admin authentication failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-[#070A0F] text-slate-100 overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Top Badge */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Staff Administration Hub</span>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Main App</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl border border-slate-800 bg-[#0E1520]/90 p-8 sm:p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black">
              <Shield className="size-7" />
              <span className="absolute -top-1 -right-1 flex size-3.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-3.5 rounded-full bg-cyan-500 border-2 border-[#0E1520]" />
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              VIBNEX <span className="text-cyan-400">Admin Center</span>
            </h1>
            <p className="mt-1.5 text-xs text-slate-400 max-w-xs mx-auto">
              Secure moderation hub for managing users, monitoring posts, and auditing system analytics.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 animate-fade-up">
              <AlertCircle className="size-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vibnex.dev"
                  className="w-full rounded-xl border border-slate-800 bg-[#070A0F]/80 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:bg-[#070A0F] focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-[#070A0F]/80 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:bg-[#070A0F] focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-teal-300 active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
            >
              <span>{submitting ? "Authenticating..." : "Access Dashboard"}</span>
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
