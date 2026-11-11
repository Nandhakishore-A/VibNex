import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  MessageSquare,
  LogOut,
  Shield,
  ExternalLink,
  Activity,
  Database,
  Cloud,
  Clock,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

const NAV_ITEMS = [
  { to: "/", end: true, label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "User Management", icon: Users },
  { to: "/posts", label: "Post Moderation", icon: Newspaper },
  { to: "/comments", label: "Comments", icon: MessageSquare },
];

export default function AdminLayout() {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentNav = NAV_ITEMS.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  ) || NAV_ITEMS[0];

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
        : "text-slate-400 hover:text-white hover:bg-slate-900/60"
    }`;

  return (
    <div className="flex min-h-screen bg-[#070A0F] text-slate-100 font-sans">
      {/* Left Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-[#0E1520]/90 backdrop-blur-xl p-4 shrink-0 z-20">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md shadow-cyan-500/30">
              V
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-cyan-400 border border-[#0E1520]" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  VIBNEX ADMIN
                </span>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 uppercase tracking-wider border border-cyan-500/30">
                  Staff
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Master Command Hub</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                <item.icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* System Cluster Status */}
          <div className="rounded-2xl border border-slate-800 bg-[#070A0F]/70 p-3.5 space-y-2.5">
            <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="size-3 text-cyan-400" />
              <span>Cluster Telemetry</span>
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Database className="size-3 text-cyan-400" /> MongoDB Atlas
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Cloud className="size-3 text-teal-400" /> Cloudinary CDN
                </span>
                <span className="text-[10px] font-mono text-teal-400 font-semibold">Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <a
            href="/"
            className="flex items-center justify-between rounded-xl p-2.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-white transition-colors border border-slate-800"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="size-3.5 text-cyan-400" />
              Launch Main Site
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">Live</span>
          </a>

          <div className="flex items-center justify-between rounded-xl bg-[#070A0F]/80 p-2.5 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                {(adminUser?.name || "A")[0].toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">
                  {adminUser?.name || "Administrator"}
                </p>
                <p className="truncate text-[10px] text-slate-400">
                  @{adminUser?.username || "admin"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800 bg-[#0E1520]/80 backdrop-blur-xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-500">Admin</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <currentNav.icon className="size-4 text-cyan-400" />
              {currentNav.label}
            </span>
          </div>

          {/* Right Header Status info */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
              <Clock className="size-3.5 text-cyan-400" />
              <span className="font-mono text-[11px]">{currentTime}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-2xs font-semibold text-cyan-300">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Production Session</span>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
