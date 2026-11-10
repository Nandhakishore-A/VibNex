import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Users,
  Image as ImageIcon,
  Radio,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Share2,
} from "lucide-react";

import Logo from "../../components/ui/Logo.jsx";
import PostGrid from "../../components/post/PostGrid.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import * as postService from "../../services/postService.js";

export default function LandingPage() {
  useDocumentTitle("VIBNEX — Connect. Share. Interact.");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    postService
      .getExplorePosts({ limit: 6, sort: "popular" })
      .then((res) => {
        if (mounted && res?.posts) setPosts(res.posts);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070A0F]/85 border-b border-slate-800/80 px-6 lg:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo wordmark={true} className="h-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-cyan-400 transition-colors">Explore</Link>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-xl border border-slate-700/80 hover:border-slate-600 bg-slate-900/60 transition-all"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Join Now
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Glowing Ambient Light Orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Interactive Social Network
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Connect. <span className="text-cyan-400">Share.</span> <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Interact.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              A next-generation social platform to share your thoughts, express your ideas, and stay connected with the people who matter.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="px-6 py-3.5 text-base font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: 3D App Phone Mockup (From User Design Reference) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-80 h-[480px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-[40px] border-4 border-slate-700/80 shadow-2xl shadow-cyan-500/20 p-4 flex flex-col justify-between overflow-hidden">
              {/* Screen Notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-4" />

              {/* Glowing Phone Wave Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-950 to-slate-950 -z-0" />

              {/* Floating Avatars */}
              <div className="absolute top-16 left-3 w-10 h-10 rounded-full border-2 border-cyan-400 overflow-hidden shadow-lg animate-bounce">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-28 right-3 w-10 h-10 rounded-full border-2 border-teal-400 overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-28 left-4 w-9 h-9 rounded-full border-2 border-cyan-300 overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="avatar" className="w-full h-full object-cover" />
              </div>

              {/* Center App Logo Display */}
              <div className="my-auto text-center relative z-10 space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center shadow-xl shadow-cyan-500/20">
                  <Logo wordmark={false} className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-wider">VIBNEX</h3>
                <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase">Next-Gen Social</p>
              </div>

              {/* Bottom Phone Bar */}
              <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>

        {/* 3. Platform Stats Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">50K+</div>
              <div className="text-xs text-slate-400">Active Users</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">1M+</div>
              <div className="text-xs text-slate-400">Posts Shared</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">100K+</div>
              <div className="text-xs text-slate-400">Connections</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Real-Time</div>
              <div className="text-xs text-slate-400">Interactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Trending Feed Preview */}
      <section id="features" className="py-12 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-400" />
              Trending on VIBNEX
            </h2>
            <p className="text-sm text-slate-400 mt-1">Discover popular posts from across the platform</p>
          </div>
          <Link
            to="/explore"
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Explore all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <PostGrid posts={posts} loading={loading} />
      </section>

      {/* 5. Footer */}
      <footer id="about" className="mt-auto border-t border-slate-800/80 bg-[#070A0F] py-8 px-6 lg:px-16 text-center text-sm text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-2">
            <Logo wordmark={true} className="h-6" />
            <span>— Connect. Share. Interact.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/explore" className="hover:text-cyan-400">Explore</Link>
            <Link to="/login" className="hover:text-cyan-400">Log In</Link>
            <Link to="/register" className="hover:text-cyan-400">Register</Link>
            <a href="https://github.com/Nandhakishore-A" target="_blank" rel="noreferrer" className="hover:text-cyan-400">Nandhakishore A</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
