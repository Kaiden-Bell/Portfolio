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
  ShieldCheck,
  Gamepad2
} from 'lucide-react';

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
    title: "Secure Password Manager",
    tech: "C++, Systems Security",
    description: [
      "Developed a secure credential storage system emphasizing encryption and safe memory handling.",
      "Applied system-level security design principles and defensive programming practices.",
      "Focused on minimizing attack surface and improving secure memory management."
    ],
    icon: <ShieldCheck className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/Password-Manager",
    demo: "https://www.youtube.com/watch?v=demo789"
  },
  {
    title: "ML Match Outcome Predictor",
    tech: "Python, ML, Data Engineering",
    description: [
      "Designed a predictive system integrating API data and historical statistics.",
      "Applied supervised learning techniques and data preprocessing pipelines.",
      "Modeled uncertainty in competitive systems using real-world match data."
    ],
    icon: <Database className="w-6 h-6" />,
    source: "https://github.com/Kaiden-Bell/RLPredictor",
    demo: "https://www.youtube.com/watch?v=demo012"
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "Independent IT & Systems Technician",
    company: "Self-Employed",
    period: "2025 ~ Present",
    points: [
      "Diagnosed and resolved hardware, firmware, and OS-level issues across diverse client systems.",
      "Performed component-level troubleshooting and system configuration.",
      "Conducted secure system hardening and reliability optimization."
    ]
  },
  {
    role: "Freelance Web & Systems Developer",
    company: "Self-Employed",
    period: "2024 ~ Present",
    points: [
      "Designed and deployed full-stack production websites including backend APIs and database integration.",
      "Managed hosting environments and domain configuration.",
      "Implemented responsive design and optimized performance for diverse client needs."
    ]
  },
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

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-spider-purple/20 bg-spider-black/80 backdrop-blur-md px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-spider-magenta flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform">
          <span className="text-white font-black -rotate-45">KB</span>
        </div>
        <span className="font-mono text-xs tracking-widest text-spider-blue hidden sm:block uppercase">
          Hardware // Embedded
        </span>
      </a>
      <div className="flex gap-6 text-xs font-mono uppercase tracking-tighter">
        <a href="#about" className="hover:text-spider-magenta transition-colors">About</a>
        <a href="#skills" className="hover:text-spider-magenta transition-colors">Tech</a>
        <a href="#projects" className="hover:text-spider-magenta transition-colors">Projects</a>
        <a href="#contact" className="hover:text-spider-magenta transition-colors">Contact</a>
      </div>
    </div>
  </nav>
);

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

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

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
        >
          <Navbar />

          <main className="pt-24">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center px-6 max-w-7xl mx-auto relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-spider-purple/10 rounded-full blur-[120px] -z-10" />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="z-20 relative lg:max-w-4xl"
              >
                <span className="font-mono text-spider-blue mb-4 block tracking-widest">
                  SYSTEM_ARCHITECT // KAIDEN_BELL
                </span>
                <h1 className="text-6xl sm:text-9xl font-black leading-[0.85] mb-8">
                  HARDWARE<br />
                  <span className="text-spider-magenta italic glitch-text">ENGINEER</span>
                </h1>
                <p className="max-w-xl text-lg text-spider-silver/80 font-medium leading-relaxed mb-10">
                  Computer Science and Engineering student specializing in <span className="text-white">embedded systems</span>, 
                  computer architecture, and digital logic. Bridging the gap between software intent and physical reality.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="#projects" 
                    className="bg-spider-magenta text-white px-8 py-4 font-black uppercase tracking-tighter hover:bg-white hover:text-spider-magenta transition-all flex items-center gap-2 group"
                  >
                    View Schematics
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#contact" 
                    className="border border-spider-purple/40 px-8 py-4 font-black uppercase tracking-tighter hover:bg-spider-purple/10 transition-all"
                  >
                    Connect
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 -z-10 lg:z-10 pointer-events-none"
              >
                <div className="absolute inset-0 bg-linear-to-r from-spider-black via-transparent to-transparent z-20 circuit-mask"/>
                <div className="absolute inset-0 bg-spider-magenta/10 mix-blend-overlay z-10 circuit-mask" />
                <img 
                  src="src/assets/bell_graduation-40-removebg-preview.png" 
                  alt="Hardware Architecture" 
                  className="w-full h-full object-contain contrast-100 mix-blend-lighten"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="aspect-square bg-spider-dark border-2 border-spider-purple/20 p-4 relative group">
                    <div className="absolute inset-0 bg-spider-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src="https://cdn.5280.com/2018/05/Reno_FTG_Jay-Bouchard.jpg" 
                      alt="Kaiden Bell" 
                      className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-4 border-b-4 border-spider-magenta -z-10" />
                  </div>
                </div>
                <div>
                  <SectionHeading title="The Transition" subtitle="Professional Profile" />
                  <div className="space-y-6 text-spider-silver/80 leading-relaxed">
                    <p>
                      I started with a strong software foundation, but my curiosity led me deeper into the machine. 
                      I've spent the last few years descending the stack—from high-level applications to 
                      <span className="text-white"> low-level systems programming</span> and finally into the 
                      physical realm of <span className="text-white">hardware design</span>.
                    </p>
                    <p>
                      My software background gives me a unique edge in hardware engineering. I don't just design 
                      circuits; I design systems that are optimized for the code that will run on them. 
                      Whether it's <span className="text-spider-magenta">ARMv7 emulation</span> or real-time 
                      embedded control, I build with the full stack in mind.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-spider-dark/50 p-4 border border-spider-purple/10">
                        <span className="font-mono text-xs text-spider-blue block mb-1">LOCATION</span>
                        <span className="font-bold text-white">Sparks, Nevada</span>
                      </div>
                      <div className="bg-spider-dark/50 p-4 border border-spider-purple/10">
                        <span className="font-mono text-xs text-spider-blue block mb-1">EDUCATION</span>
                        <span className="font-bold text-white">BS CS & Engineering</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 px-6 bg-spider-dark/30 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <SectionHeading title="Core Matrix" subtitle="Technical Competencies" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Hardware",
                      icon: <CircuitBoard className="text-spider-magenta" />,
                      tech: ["Embedded C", "ADC/UART", "ARMv7", "PCB Design"],
                      logos: ["C", "Altium", "Verilog"]
                    },
                    {
                      title: "Low-Level",
                      icon: <Terminal className="text-spider-blue" />,
                      tech: ["C++", "Assembly", "Memory Modeling", "Bitwise Ops"],
                      logos: ["C++", "ASM", "GDB"]
                    },
                    {
                      title: "Software",
                      icon: <Code2 className="text-spider-magenta" />,
                      tech: ["Python", "Java", "SQL Modeling", "REST APIs"],
                      logos: ["Python", "Java", "SQL"]
                    },
                    {
                      title: "Infrastructure",
                      icon: <Layers className="text-spider-blue" />,
                      tech: ["Linux", "Docker", "AWS EC2", "Git/GitHub"],
                      logos: ["Linux", "Docker", "AWS"]
                    }
                  ].map((cat, i) => (
                    <motion.div 
                      key={i}
                      initial="rest"
                      animate="rest"
                      whileHover="hover"
                      className="bg-spider-black border border-spider-purple/10 relative overflow-hidden group cursor-pointer"
                    >
                      <div className="p-8 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                          <div className="p-3 bg-spider-purple/10 rounded-lg">
                            {cat.icon}
                          </div>
                          <div className="flex gap-2">
                            {cat.logos.map((logo, idx) => (
                              <span key={idx} className="text-[10px] font-mono text-spider-blue/40 border border-spider-blue/20 px-1.5 py-0.5 rounded">
                                {logo}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-spider-magenta transition-colors">
                          {cat.title}
                        </h3>

                        <motion.div 
                          variants={{
                            rest: { height: 0, opacity: 0 },
                            hover: { height: "auto", opacity: 1 }
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-3 font-mono text-xs text-spider-silver/60 pt-4 border-t border-spider-purple/10">
                            {cat.tech.map((skill, j) => (
                              <li key={j} className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-spider-magenta" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] font-mono text-spider-blue tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                          <span>Hover to expand</span>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-spider-magenta/10 clip-path-polygon-[100%_0,100%_100%,0_0] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
              <SectionHeading title="Hardware Lab" subtitle="Engineering Projects" />
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-spider-dark/40 border border-spider-purple/10 p-8 hover:border-spider-magenta/40 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-spider-purple/20 text-spider-magenta">
                        {project.icon}
                      </div>
                      <span className="font-mono text-[10px] text-spider-blue uppercase tracking-widest">
                        {project.tech}
                      </span>
                    </div>
                    <h3 className="text-2xl mb-4 text-white group-hover:text-spider-magenta transition-colors">
                      {project.title}
                    </h3>
                    <ul className="space-y-3 text-sm text-spider-silver/70 mb-8">
                      {project.description.map((point, j) => (
                        <li key={j} className="flex gap-2">
                          <ChevronRight className="w-4 h-4 text-spider-magenta shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4">
                      {project.source && (
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-spider-blue hover:text-white flex items-center gap-1 uppercase"
                        >
                          <Github className="w-3 h-3" /> Source
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-spider-blue hover:text-white flex items-center gap-1 uppercase"
                        >
                          <ExternalLink className="w-3 h-3" /> Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 px-6 bg-spider-dark/30">
              <div className="max-w-7xl mx-auto">
                <SectionHeading title="Service History" subtitle="Professional Experience" />
                <div className="space-y-12">
                  {EXPERIENCES.map((exp, i) => (
                    <div key={i} className="grid md:grid-cols-[200px_1fr] gap-8">
                      <div className="font-mono text-spider-blue text-sm">
                        {exp.period}
                      </div>
                      <div className="border-l-2 border-spider-purple/20 pl-8 pb-8">
                        <h3 className="text-2xl text-white mb-1">{exp.role}</h3>
                        <span className="text-spider-magenta font-bold block mb-4 italic">{exp.company}</span>
                        <ul className="space-y-3 text-spider-silver/70">
                          {exp.points.map((point, j) => (
                            <li key={j} className="flex gap-2">
                              <div className="w-1.5 h-1.5 bg-spider-blue mt-2 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden bg-spider-black scroll-mt-24">
              <div className="schematic-grid absolute inset-0 z-0" />
              
              {/* Cursor Glow Effect */}
              <CursorGlow />

              <div className="max-w-7xl w-full z-10 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
                <div className="info-side">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-spider-magenta" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-spider-magenta">Signal Integrity</span>
                  </div>
                  
                  <h2 className="text-6xl sm:text-8xl font-black text-white leading-[0.9] mb-8">
                    CONNECT<br/>TO NODE<span className="text-spider-magenta">.</span>
                  </h2>
                  
                  <p className="text-lg text-spider-silver/60 max-w-md mb-12 leading-relaxed">
                    Available for specialized hardware architectural consulting, FPGA design, and high-speed PCB optimization. Current latency: &lt;12ms.
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
