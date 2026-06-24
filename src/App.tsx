/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Code2,
  Terminal,
  CircuitBoard,
  Layers,
  Zap,
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Monitor,
  Database,
  Menu,
  X,
  ShieldCheck,
  Gamepad2
} from 'lucide-react';
import ProjectCardstack from './ProjectCardstack';
import AboutParallax from './AboutParallax';
import TechStackOrbit from './TechStackOrbit';
import ExperienceTrack from './ExperienceTrack';
import Hero from './Hero';

// --- Types ---
interface Project {
  title: string;
  tech: string;
  description: string[];
  icon: React.ReactNode;
  source?: string;
  demo?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Embedded Swamp Cooler Control System",
    tech: "C, Microcontroller, Sensors",
    description: [
      "Designed and implemented a full embedded control system using breadboarded circuitry.",
      "Developed real-time control logic utilizing ADC readings, timers, and ISRs.",
      "Performed hardware debugging to resolve sensor noise and signal stability issues."
    ],
    icon: <Zap className="w-6 h-6" />,
    source: "https://github.com/BruhBanks09/CPE-301-Final-Project",
    demo: "https://www.youtube.com/watch?v=demo123"
  },
  {
    title: "ARMv7 Instruction-Level Emulator",
    tech: "C++, Assembly, Architecture",
    description: [
      "Built a functional ARMv7 emulator modeling registers, instruction decoding, and memory.",
      "Implemented opcode parsing and execution logic for multiple instruction categories.",
      "Simulated program counter updates and memory access instructions."
    ],
    icon: <Cpu className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/ARMv7-Emulator",
    demo: "https://www.youtube.com/watch?v=demo456"
  },
  {
    title: "Secure Password Manager v1.0",
    tech: "C++, Systems Security",
    description: [
      "A secure credential storage system emphasizing encryption and safe memory handling.",
    ],
    icon: <ShieldCheck className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/Password-Manager",
    demo: "https://www.youtube.com/watch?v=demo789"
  },
  {
    title: "The Vault: Secure Password Manager v2.0",
    tech: "C++, Systems Security",
    description: [
      "A local encrypted password manager with optional Arduino keypad-based hardware gating.",
    ],
    icon: <ShieldCheck className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/Password-Manager",
    demo: "https://www.youtube.com/watch?v=demo789"
  },
  {
    title: "RLPredictor: Competitive Match Outcome Predictor",
    tech: "Python, ML, Data Engineering",
    description: [
      "RLPredictor is an advanced Machine Learning prediction engine for Rocket League Esports."       
    ],
    icon: <Database className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/RLPredictor",
    demo: "https://www.youtube.com/watch?v=demo012"
  }
];



// --- Components ---

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "> INITIALIZING SYSTEM_ARCH_V2.04...",
    "> LOADING KERNEL MODULES...",
    "> CHECKING HARDWARE INTEGRITY...",
    "> DETECTING ARMv7 ARCHITECTURE...",
    "> MOUNTING SILICON_SUBSTRATE...",
    "> ESTABLISHING NEURAL_LINK...",
    "> WELCOME, USER."
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < messages.length) {
        setLogs(prev => [...prev, messages[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-100 bg-spider-black flex items-center justify-center p-6 font-mono"
    >
      <div className="max-w-md w-full space-y-2">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 border-2 border-spider-magenta animate-pulse flex items-center justify-center">
            <Cpu className="text-spider-magenta" />
          </div>
          <div className="h-1 grow bg-spider-purple/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-spider-magenta shadow-[0_0_15px_rgba(214,28,132,0.8)]"
            />
          </div>
        </div>
        {logs.map((log, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-spider-blue text-sm"
          >
            {log}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 border-b border-spider-purple/20 bg-spider-black/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="px-4 sm:px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand ID Element */}
        <a href="#" className="flex items-center gap-4 group cursor-pointer w-auto justify-start">
          <div className="relative flex items-center justify-center w-10 h-10 border border-spider-purple/40 bg-spider-dark/80 group-hover:bg-spider-magenta/10 group-hover:border-spider-magenta transition-all duration-300">
            <div className="absolute inset-[3px] border border-spider-magenta/20 group-hover:border-spider-magenta/80 transition-colors" />
            <span className="text-white font-black tracking-tighter text-sm z-10 group-hover:text-spider-magenta transition-colors relative">
              KB
            </span>
            {/* Cyber accents */}
            <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-spider-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-spider-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-spider-magenta uppercase leading-none mb-1.5 opacity-80">
              System_Arch // v2.0
            </span>
            <span className="font-sans text-xs font-black text-spider-silver uppercase tracking-widest leading-none group-hover:text-white transition-colors">
              Hardware Engineering
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex gap-6 sm:gap-8 items-center bg-spider-dark/40 px-6 py-2.5 border border-spider-purple/10">
          {[
            { name: "About", href: "#about", id: "01" },
            { name: "Tech", href: "#skills", id: "02" },
            { name: "Projects", href: "#projects", id: "03" },
            { name: "Contact", href: "#contact", id: "04" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-spider-silver/60 hover:text-white transition-colors"
            >
              <span className="text-[9px] text-spider-magenta opacity-50 group-hover:opacity-100 transition-opacity">
                {link.id}.
              </span>
              <span className="relative overflow-hidden pb-1">
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-spider-magenta -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="sm:hidden text-spider-magenta p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden bg-spider-dark/95 backdrop-blur-md border-t border-spider-purple/20"
          >
            <div className="flex flex-col p-4 gap-2">
              {[
                { name: "About", href: "#about", id: "01" },
                { name: "Tech", href: "#skills", id: "02" },
                { name: "Projects", href: "#projects", id: "03" },
                { name: "Contact", href: "#contact", id: "04" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 font-mono text-xs uppercase tracking-widest text-spider-silver hover:bg-spider-magenta/10 hover:text-white transition-colors border border-spider-magenta/10"
                >
                  <span className="text-[10px] text-spider-magenta opacity-70">
                    {link.id}.
                  </span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12">
    <span className="font-mono text-spider-magenta text-xs tracking-[0.3em] uppercase block mb-2">
      {subtitle}
    </span>
    <h2 className="text-4xl sm:text-6xl font-black text-white">
      {title}<span className="text-spider-magenta">.</span>
    </h2>
  </div>
);

const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-0 w-150 h-150 bg-spider-magenta/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
      style={{ left: mousePos.x, top: mousePos.y }}
    />
  );
};

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {[
              { name: "About", href: "#about", icon: <Layers className="w-5 h-5" /> },
              { name: "Tech", href: "#skills", icon: <Cpu className="w-5 h-5" /> },
              { name: "Projects", href: "#projects", icon: <Code2 className="w-5 h-5" /> },
              { name: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-spider-dark/95 border border-spider-magenta/40 text-spider-magenta flex items-center justify-center hover:bg-spider-magenta hover:text-white transition-all shadow-lg shadow-spider-magenta/20 group relative"
              >
                {link.icon}
                <span className="absolute right-full mr-4 bg-spider-black/90 text-white text-xs font-mono px-3 py-1.5 border border-spider-purple/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.name}
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(214,28,132,0.4)] ${isOpen ? 'bg-spider-magenta text-white rotate-45' : 'bg-spider-black/90 backdrop-blur-md border border-spider-magenta text-spider-magenta hover:bg-spider-magenta/20 hover:scale-110'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    </div>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedSkillCard, setExpandedSkillCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen selection:bg-spider-magenta selection:text-white">
      <AnimatePresence>
        {!isLoaded && <Intro onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navbar />
          <FloatingNav />

          <main className="pt-24">
            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <AboutParallax />

            {/* Orbiting Tech Stack Section */}
            <TechStackOrbit />

            {/* Projects Section */}
            <div className="mb-32">
              <ProjectCardstack projects={PROJECTS} />
            </div>

            {/* Experience Section */}
            <ExperienceTrack />

            {/* Contact Section */}
            <section id="contact" className="min-h-screen py-32 flex items-center justify-center px-6 relative overflow-hidden bg-spider-dark/20 scroll-mt-24">

              {/* Cursor Glow Effect */}
              <CursorGlow />

              <div className="max-w-7xl w-full z-10 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
                <div className="info-side">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-spider-magenta" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-spider-magenta">Signal Integrity</span>
                  </div>

                  <h2 className="text-6xl sm:text-8xl font-black text-white leading-[0.9] mb-8">
                    CONNECT<br />TO NODE<span className="text-spider-magenta">.</span>
                  </h2>

                  <p className="text-lg text-spider-silver/60 max-w-md mb-12 leading-relaxed">
                    Focused on embedded systems, hardware architecture, and low-level software. Building reliable systems where firmware meets silicon. Current latency: &lt;12ms.
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-spider-purple/20">
                    <div className="font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-spider-magenta block mb-1">// PHYS_LOC</span>
                      <span className="text-white">Sparks, NV // 39.53° N</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-spider-magenta block mb-1">// STATUS</span>
                      <span className="text-white">SYSTEM_ACTIVE_IO</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-spider-magenta block mb-1">// VOLTAGE</span>
                      <span className="text-white">1.2V Core / 3.3V IO</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-spider-magenta block mb-1">// ARCH</span>
                      <span className="text-white">ARMv7_HWD_RE</span>
                    </div>
                  </div>
                </div>

                <div className="links-side bg-spider-purple/5 border border-spider-purple/10">
                  <div className="flex flex-col">
                    <a href="https://github.com/Kaiden-Bell" target="_blank" rel="noreferrer" className="contact-node group">
                      <div className="node-info">
                        <span className="font-mono text-[10px] text-spider-magenta block mb-1 uppercase tracking-widest">0x01 Repository</span>
                        <span className="text-2xl font-bold text-white uppercase">GitHub</span>
                      </div>
                      <div className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <Github className="w-8 h-8 text-spider-magenta" />
                      </div>
                    </a>

                    <a href="https://www.linkedin.com/in/kaiden-bell" target="_blank" rel="noreferrer" className="contact-node group">
                      <div className="node-info">
                        <span className="font-mono text-[10px] text-spider-magenta block mb-1 uppercase tracking-widest">0x02 Professional</span>
                        <span className="text-2xl font-bold text-white uppercase">LinkedIn</span>
                      </div>
                      <div className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <ExternalLink className="w-8 h-8 text-spider-magenta" />
                      </div>
                    </a>

                    <a href="mailto:Kaidenbell50@gmail.com" className="contact-node group">
                      <div className="node-info">
                        <span className="font-mono text-[10px] text-spider-magenta block mb-1 uppercase tracking-widest">0x03 Direct Mail</span>
                        <span className="text-2xl font-bold text-white uppercase">Email Link</span>
                      </div>
                      <div className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <Mail className="w-8 h-8 text-spider-magenta" />
                      </div>
                    </a>

                    <a href="https://drive.google.com/file/d/1GDoazPf1aYKcHf0yE430SP93Nb2B9v3Q/view?usp=sharing" target="_blank" rel="noreferrer" className="contact-node group">
                      <div className="node-info">
                        <span className="font-mono text-[10px] text-spider-magenta block mb-1 uppercase tracking-widest">0x04 Blueprints</span>
                        <span className="text-2xl font-bold text-white uppercase">Download CV</span>
                      </div>
                      <div className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <Zap className="w-8 h-8 text-spider-magenta" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="py-12 px-6 border-t border-spider-purple/10 text-center font-mono text-[10px] text-spider-silver/30 uppercase tracking-[0.4em]">
            &copy; 2026 KAIDEN BELL // ALL SYSTEMS OPERATIONAL
          </footer>
        </motion.div>
      )}
    </div>
  );
}
