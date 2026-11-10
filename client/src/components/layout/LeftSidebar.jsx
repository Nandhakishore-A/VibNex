import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  Bookmark,
  User as UserIcon,
  Settings,
  Plus,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/useAuth.js";
import { useNotifications } from "../../context/useNotifications.js";
import Avatar from "../ui/Avatar.jsx";
import Logo from "../ui/Logo.jsx";
import { cn } from "../../utils/cn.js";

const navItemClass = ({ isActive }) =>
  cn(
    "group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
    isActive
      ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold"
      : "text-slate-400 hover:text-white hover:bg-slate-900/60"
  );

export default function LeftSidebar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      aria-label="Sidebar navigation"
      className="flex flex-col justify-between h-full py-4 select-none"
    >
      {/* Brand & Primary Navigation Links */}
      <div className="space-y-6">
        <div className="px-3 pb-2 hidden md:block">
          <Link to="/" className="inline-block">
            <Logo wordmark={true} className="h-8" />
          </Link>
        </div>

        <nav className="flex flex-col space-y-1.5" aria-label="Main sidebar">
          <NavLink to="/" end className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <Home className="size-5 shrink-0" aria-hidden="true" />
              <span>Home</span>
            </div>
          </NavLink>

          <NavLink to="/explore" className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <Compass className="size-5 shrink-0" aria-hidden="true" />
              <span>Explore</span>
            </div>
          </NavLink>

          <NavLink to="/notifications" className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <Bell className="size-5 shrink-0" aria-hidden="true" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 ? (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-cyan-400 px-1.5 text-[11px] font-bold text-slate-950">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-cyan-500/20 px-1.5 text-[11px] font-bold text-cyan-400">
                3
              </span>
            )}
          </NavLink>

          <NavLink to="/messages" className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <MessageSquare className="size-5 shrink-0" aria-hidden="true" />
              <span>Messages</span>
            </div>
          </NavLink>

          <NavLink to="/saved" className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <Bookmark className="size-5 shrink-0" aria-hidden="true" />
              <span>Bookmarks</span>
            </div>
          </NavLink>

          <NavLink to={`/u/${user.username}`} className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <UserIcon className="size-5 shrink-0" aria-hidden="true" />
              <span>Profile</span>
            </div>
          </NavLink>

          <NavLink to="/settings/account" className={navItemClass}>
            <div className="flex items-center gap-3.5">
              <Settings className="size-5 shrink-0" aria-hidden="true" />
              <span>Settings</span>
            </div>
          </NavLink>
        </nav>

        {/* Create Post Action CTA */}
        <Link
          to="/posts/new"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:from-cyan-300 hover:to-teal-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="size-4" aria-hidden="true" />
          <span>Create Post</span>
        </Link>
      </div>

      {/* User Footer Card */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between rounded-2xl p-2.5 transition-colors hover:bg-slate-900/60 bg-[#0E1520]/60 border border-slate-800/80">
          <Link
            to={`/u/${user.username}`}
            className="flex items-center gap-3 min-w-0 flex-1"
          >
            <Avatar
              src={user.avatar}
              name={user.name}
              username={user.username}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                {user.name || user.username}
              </p>
              <p className="truncate text-xs text-slate-400">
                @{user.username}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
