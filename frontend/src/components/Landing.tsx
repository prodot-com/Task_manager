import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  Layout,
  ArrowRight,
  X,
  Mail,
  Lock,
  User,
  Github,
  Globe,
  Code,
  Play,
  Twitter,
  Linkedin,
  Command,
  Layers,
  Cpu,
} from "lucide-react";

const VIEW_STATES = {
  LANDING: "landing",
  LOGIN: "login",
  REGISTER: "register",
};

const App = () => {
  const [view, setView] = useState(VIEW_STATES.LANDING);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-500/30 selection:text-zinc-200 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-zinc-800/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/10 rounded-full blur-[160px]" />
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-zinc-800 py-4"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView(VIEW_STATES.LANDING)}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
              <CheckCircle className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Nexus
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setView(VIEW_STATES.LOGIN)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => setView(VIEW_STATES.REGISTER)}
              className="bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === VIEW_STATES.LANDING ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <HeroSection onStart={() => setView(VIEW_STATES.REGISTER)} />

            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<ShieldCheck />}
                  title="Privacy First"
                  desc="Encrypted task storage and private workspaces for high-security teams."
                />
                <FeatureCard
                  icon={<Zap />}
                  title="Lightning Fast"
                  desc="Optimized for speed. Zero-lag interface with instant global synchronization."
                />
                <FeatureCard
                  icon={<Layout />}
                  title="Flexible Views"
                  desc="Switch between Kanban, List, and Calendar views seamlessly."
                />
              </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden">
                <div className="max-w-2xl mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Master your workflow.
                  </h2>
                  <p className="text-zinc-400">
                    Everything you need to manage complex projects without the
                    clutter. Designed for high-velocity engineering teams.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatItem label="Active Users" value="20k+" />
                  <StatItem label="Tasks Completed" value="1.2M" />
                  <StatItem label="Uptime" value="99.9%" />
                  <StatItem label="Global Regions" value="14" />
                </div>
              </div>
            </section>

            <Footer />
          </motion.div>
        ) : (
          <AuthModal
            key="auth"
            type={view}
            setView={setView}
            onClose={() => setView(VIEW_STATES.LANDING)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroSection = ({ onStart } :any) => (
  <section className="pt-48 pb-20 px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-full bg-zinc-900/50 text-xs font-medium text-zinc-400 uppercase tracking-widest"
    >
      Version 2.0 is now live
    </motion.div>
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white"
    >
      Focus on building. <br />{" "}
      <span className="text-zinc-600">We'll handle the rest.</span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed"
    >
      Nexus is the central hub for your team's tasks, docs, and sprints.
      Minimalist design, maximum output.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex justify-center gap-4"
    >
      <button
        onClick={onStart}
        className="px-8 py-3 bg-white text-black rounded-md font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2"
      >
        Get Started <ArrowRight size={18} />
      </button>
      <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-md font-semibold hover:bg-zinc-800 transition-all">
        View Documentation
      </button>
    </motion.div>
  </section>
);

const AuthModal = ({ type, onClose, setView }: any) => {
  const isLogin = type === VIEW_STATES.LOGIN;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center lg:p-4"
    >
      <div className="w-full max-w-[1000px] h-full lg:h-[680px] bg-[#09090b] flex flex-col lg:flex-row overflow-hidden lg:rounded-xl lg:border lg:border-zinc-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-50 p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              Login to your Nexus account to manage tasks.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <InputField
                label="Full Name"
                placeholder="Jane Doe"
                type="text"
              />
            )}
            <InputField
              label="Email"
              placeholder="m@example.com"
              type="email"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                {isLogin && (
                  <button className="text-xs text-zinc-500 hover:text-white underline underline-offset-4">
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#0c0c0d] border border-zinc-800 rounded-md focus:ring-1 focus:ring-zinc-400 text-white outline-none transition-all"
              />
            </div>
            <button className="w-full py-2 bg-zinc-100 hover:bg-white text-black font-semibold rounded-md transition-colors mt-2">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#09090b] px-2 text-zinc-600">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <SocialBtn icon={<Github size={18} />} />
              <SocialBtn icon={<Globe size={18} />} />
              <SocialBtn icon={<Code size={18} />} />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() =>
                setView(isLogin ? VIEW_STATES.REGISTER : VIEW_STATES.LOGIN)
              }
              className="ml-2 text-zinc-300 hover:text-white underline underline-offset-4"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <div className="hidden lg:flex flex-1 bg-zinc-900/30 border-l border-zinc-800 items-center justify-center relative">
          <div className="w-72 h-72 border border-zinc-800 rounded-full flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-transparent" />
            <div className="absolute w-[200%] h-[1px] bg-zinc-800 rotate-45" />
            <div className="absolute w-[200%] h-[1px] bg-zinc-800 -rotate-45" />
            <Layout className="w-16 h-16 text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500 relative z-10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <CheckCircle className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Nexus
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs mb-6">
            The operating system for engineering excellence. Plan, track, and
            ship software at scale.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer" />
            <Github className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer" />
            <Linkedin className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Integrations</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Changelog</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer">Documentation</li>
            <li className="hover:text-white cursor-pointer">API Reference</li>
            <li className="hover:text-white cursor-pointer">Guides</li>
            <li className="hover:text-white cursor-pointer">Community</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer">License</li>
            <li className="hover:text-white cursor-pointer">Security</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs uppercase tracking-widest">
          © 2026 Nexus Systems Inc.
        </p>
        <div className="flex gap-6 text-[11px] text-zinc-500 uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer">System Status</span>
          <span className="hover:text-white cursor-pointer">
            Cookie Settings
          </span>
        </div>
      </div>
    </div>
  </footer>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-8 border border-zinc-900 bg-zinc-900/20 rounded-xl hover:border-zinc-700 transition-all group">
    <div className="w-10 h-10 mb-6 text-zinc-400 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StatItem = ({ label, value }: any) => (
  <div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
      {label}
    </div>
  </div>
);

const InputField = ({ label, placeholder, type }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-white px-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-[#0c0c0d] border border-zinc-800 rounded-md focus:ring-1 focus:ring-zinc-400 text-white placeholder:text-zinc-700 outline-none transition-all"
    />
  </div>
);

const SocialBtn = ({ icon }: any) => (
  <button className="flex justify-center py-2 border border-zinc-800 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all">
    {icon}
  </button>
);

export default App;
