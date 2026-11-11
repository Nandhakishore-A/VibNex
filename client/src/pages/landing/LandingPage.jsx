import { useCallback, useEffect, useState, useMemo } from "react";
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
  Heart,
  Compass,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Zap,
} from "lucide-react";

import Logo from "../../components/ui/Logo.jsx";
import PostGrid from "../../components/post/PostGrid.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import * as postService from "../../services/postService.js";

const CATEGORIES = ["All", "#Travel", "#Tech", "#Design", "#Nature", "#Community"];

const FEATURES = [
  {
    icon: Radio,
    color: "from-cyan-400 to-teal-400",
    title: "Real-Time Bi-Directional Engine",
    description: "Sub-50ms Socket.IO WebSocket events deliver likes, direct chat messages, and notification pings instantly.",
  },
  {
    icon: MessageSquare,
    color: "from-teal-400 to-emerald-400",
    title: "Direct Messaging & Online Status",
    description: "Connect 1-on-1 with live typing indicators, conversation threads, and presence detection.",
  },
  {
    icon: ImageIcon,
    color: "from-cyan-400 to-blue-500",
    title: "Cloudinary CDN Media Storage",
    description: "Lossless compression, multi-image masonry galleries, and responsive image delivery across all screen sizes.",
  },
  {
    icon: ShieldCheck,
    color: "from-emerald-400 to-cyan-400",
    title: "Cryptographic Auth & Verification",
    description: "JWT session tokens, email verification guard, and strict Bcrypt password hashing protect user accounts.",
  },
];

const FAQS = [
  {
    q: "What makes VIBNEX different from other social platforms?",
    a: "VIBNEX delivers a chronological, algorithm-free feed where you control what you see. We combine high-speed real-time messaging, crisp media galleries, and clean cyber-teal aesthetics without ad tracking or data mining.",
  },
  {
    q: "How does 1-Click Social Login work?",
    a: "You can sign up or log in instantly using your Google or GitHub account with zero password hassle, or create a standalone email-verified account in seconds.",
  },
  {
    q: "Is real-time messaging end-to-end supported?",
    a: "Yes! Direct messaging (/messages) features active contact lists, live typing updates, and sub-50ms message transmission powered by Socket.IO.",
  },
  {
    q: "Can I manage and customize my profile?",
    a: "Absolutely. Customize your display name, username, bio, location, scenic cover banner, and avatar with full Cloudinary media support.",
  },
];

export default function LandingPage() {
  useDocumentTitle("VIBNEX — Connect. Share. Interact.");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [phoneTilt, setPhoneTilt] = useState({ x: 0, y: 0 });
  const [phoneLikeCount, setPhoneLikeCount] = useState(245);
  const [phoneLiked, setPhoneLiked] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

  // Subtle interactive 3D perspective tilt following cursor
  const handleHeroMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhoneTilt({ x: x * 14, y: -y * 14 });
  }, []);

  const handleHeroMouseLeave = useCallback(() => {
    setPhoneTilt({ x: 0, y: 0 });
  }, []);

  const handlePhoneLike = () => {
    if (phoneLiked) {
      setPhoneLikeCount((c) => c - 1);
      setPhoneLiked(false);
    } else {
      setPhoneLikeCount((c) => c + 1);
      setPhoneLiked(true);
    }
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    const tag = activeCategory.toLowerCase().replace("#", "");
    return posts.filter(
      (p) =>
        p.content?.toLowerCase().includes(tag) ||
        p.tags?.some((t) => t.toLowerCase().includes(tag))
    );
  }, [posts, activeCategory]);

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-300 antialiased overflow-x-hidden">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070A0F]/85 border-b border-slate-800/80 px-6 lg:px-16 py-4 flex items-center justify-between transition-all">
        <Link to="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity group">
          <Logo wordmark={true} className="h-8 transition-transform group-hover:scale-[1.02]" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            Home
          </Link>
          <Link to="/explore" className="hover:text-cyan-400 transition-colors">
            Explore
          </Link>
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-xl border border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/60 transition-all hover:bg-slate-800"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Join Now
          </Link>
        </div>
      </header>

      {/* 2. Hero Section with Interactive 3D Perspective */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden pt-12 pb-20 px-6 lg:px-16 max-w-7xl mx-auto w-full"
      >
        {/* Glowing Ambient Light Orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Interactive Next-Gen Social Network
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Connect. <span className="text-cyan-400">Share.</span> <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
                Interact.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              A next-generation social platform to share your thoughts, express your creativity, and stay connected in real time with the communities that inspire you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 hover:border-cyan-500/40 transition-all"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                Explore Platform
              </Link>
            </div>

            {/* Quick Feature Checkmarks */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 1-Click Social Sign-In
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Sub-50ms Socket.IO Chat
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Lossless CDN Media
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D App Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center relative perspective-[1200px]">
            <div
              style={{
                transform: `rotateY(${phoneTilt.x}deg) rotateX(${phoneTilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-76 sm:w-84 h-[510px] bg-gradient-to-b from-slate-900 via-slate-950 to-[#070A0F] rounded-[44px] border-4 border-slate-700/80 shadow-2xl shadow-cyan-500/20 p-4 flex flex-col justify-between overflow-hidden"
            >
              {/* Screen Notch & Speaker */}
              <div className="relative z-20 flex items-center justify-between px-3 pt-1">
                <span className="text-[11px] font-mono text-slate-400">9:41</span>
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto" />
                <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  5G
                </div>
              </div>

              {/* Glowing Phone Wave Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />

              {/* Floating Avatars around phone with pulse */}
              <div className="absolute top-16 left-3 w-10 h-10 rounded-full border-2 border-cyan-400 overflow-hidden shadow-lg animate-float-slow z-20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-28 right-3 w-10 h-10 rounded-full border-2 border-teal-400 overflow-hidden shadow-lg animate-float-reverse z-20">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-24 left-4 w-9 h-9 rounded-full border-2 border-cyan-300 overflow-hidden shadow-lg animate-float-slow z-20">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center Interactive Mini Post Preview (Matching User Reference Image) */}
              <div className="relative z-10 mx-auto w-full my-auto px-1 space-y-3">
                {/* Brand Header inside phone */}
                <div className="text-center space-y-1">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Logo wordmark={false} className="w-9 h-9" />
                  </div>
                  <h3 className="text-lg font-black text-white tracking-wider">VIBNEX</h3>
                  <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Connect • Share • Interact</p>
                </div>

                {/* Mini Post Card inside mockup */}
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 shadow-lg space-y-2 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                      alt="user"
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        Arun Prakash <span className="text-[10px] text-cyan-400 font-normal">@arunprakash</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Weekend vibes at Kodaikanal! 🌄 #Travel #Vibnex</div>
                    </div>
                  </div>

                  {/* Scenic Mountain Image Preview */}
                  <div className="rounded-xl overflow-hidden h-24 relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                      alt="scenic mountain"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Interactive Like Counter */}
                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <button
                      type="button"
                      onClick={handlePhoneLike}
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-rose-400 transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-all ${
                          phoneLiked ? "fill-rose-500 text-rose-500 scale-125" : "text-slate-400"
                        }`}
                      />
                      <span className={phoneLiked ? "text-rose-400 font-bold" : "text-slate-300 font-medium"}>
                        {phoneLikeCount}
                      </span>
                    </button>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                      <MessageSquare className="w-3.5 h-3.5" /> 32
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                      <Share2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Phone Indicator Bar */}
              <div className="w-32 h-1 bg-slate-700/80 rounded-full mx-auto mb-1" />
            </div>
          </div>
        </div>

        {/* 3. Platform Stats KPI Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">50K+</div>
              <div className="text-xs text-slate-400">Active Users</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">1M+</div>
              <div className="text-xs text-slate-400">Posts Shared</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">100K+</div>
              <div className="text-xs text-slate-400">Connections</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5 animate-pulse text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">Real-Time</div>
              <div className="text-xs text-slate-400">Interactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Features Grid */}
      <section id="features" className="py-16 px-6 lg:px-16 max-w-7xl mx-auto w-full border-t border-slate-800/70">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> High-Performance Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for Modern Social Connections
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to broadcast, discover, and build genuine community ties in a sleek cyber-teal interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Live Trending Feed Preview with Category Filter Pills */}
      <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto w-full border-t border-slate-800/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Flame className="w-6 h-6 text-cyan-400" />
              Trending on VIBNEX
            </h2>
            <p className="text-sm text-slate-400 mt-1">Discover popular posts from across the platform</p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <PostGrid posts={filteredPosts.length > 0 ? filteredPosts : posts} loading={loading} />

        <div className="mt-8 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-sm font-semibold text-slate-200 hover:text-white transition-all"
          >
            Explore All Posts & Communities
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* 6. Interactive FAQ Accordion */}
      <section id="faq" className="py-16 px-6 lg:px-16 max-w-4xl mx-auto w-full border-t border-slate-800/70">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/30 text-teal-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-white">Got Questions? We’ve Got Answers.</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 text-center space-y-6 shadow-2xl shadow-cyan-500/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Ready to experience the next generation of social networking?
            </h2>
            <p className="text-sm text-slate-400">
              Join thousands of creators, developers, and visionaries sharing ideas on VIBNEX today.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Create Your Free Account
              </Link>
              <Link
                to="/login"
                className="px-6 py-3.5 text-base font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#070A0F] py-8 px-6 lg:px-16 text-sm text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-2">
            <Logo wordmark={true} className="h-6" />
            <span className="text-xs text-slate-400">— Connect. Share. Interact.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/explore" className="hover:text-cyan-400 transition-colors">
              Explore
            </Link>
            <Link to="/login" className="hover:text-cyan-400 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="hover:text-cyan-400 transition-colors">
              Register
            </Link>
            <a
              href="https://github.com/Nandhakishore-A/VibNex"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              Nandhakishore A
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
