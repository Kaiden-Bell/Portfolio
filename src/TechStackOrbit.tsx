import React, { useState, useEffect } from 'react';
import './TechStackOrbit.css';

const TECH_NODES = [
  { name: 'C/C++', level: '95%', years: '3.0', type: 'CORE SYSTEM', icon: 'Cpp' },
  { name: 'PYTHON', level: '90%', years: '3.0', type: 'DATA / ML', icon: 'Python' },
  { name: 'GIT', level: '95%', years: '3.0', type: 'VCS', icon: 'Git' },
  { name: 'JAVA', level: '85%', years: '2.0', type: 'SOFTWARE', icon: 'Java' },
  { name: 'ASSEMBLY', level: '80%', years: '1.0', type: 'HARDWARE', icon: 'Assembly' },
  { name: 'LINUX', level: '90%', years: '1.0', type: 'OS/SYS', icon: 'Linux' },
  { name: 'SQL', level: '85%', years: '0.5', type: 'DATABASE', icon: 'SQL' },
  { name: 'VERILOG', level: '75%', years: '0.1', type: 'HDL', icon: 'Verilog' },
];

const TechLogos = {
  Python: (props: any) => <svg {...props} viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 2c1.7 0 3 .6 3.6 1.4c.5.7.7 1.6.7 2.6H9.7v1.4h6.9v3.1c0 2.2-1.8 4-4 4H9.7v1.4h2.9c3 0 5.4-2.4 5.4-5.4V8.4c0-2-.8-3.7-2.1-4.9C14.6 4.3 13.4 4 12 4"/></svg>,
  Cpp: (props: any) => <svg {...props} viewBox="0 0 24 24"><path d="M12 2L2 7l10 5l10-5L12 2M2 17l10 5l10-5M2 12l10 5l10-5"/></svg>,
  Git: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M2.6 10.59L8.38 4.8l1.69 1.7c-.18.36-.28.76-.28 1.18c0 1.52 1.23 2.75 2.75 2.75c.42 0 .82-.1 1.18-.28l2.67 2.67c-.18.36-.28.76-.28 1.18c0 1.52 1.23 2.75 2.75 2.75s2.75-1.23 2.75-2.75c0-1.52-1.23-2.75-2.75-2.75c-.42 0-.82.1-1.18.28l-2.67-2.67c.18-.36.28-.76.28-1.18c0-1.52-1.23-2.75-2.75-2.75s-2.75 1.23-2.75 2.75c0 .42.1.82.28 1.18l-1.69-1.7L2.6 10.59c-.78.78-.78 2.05 0 2.83l5.78 5.78c.78.78 2.05.78 2.83 0l5.78-5.78c.78-.78.78-2.05 0-2.83z"/></svg>,
  Docker: (props: any) => <svg {...props} viewBox="0 0 24 24"><path d="M3.5 10c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m3.5 0c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m3.5 0c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m3.5 0c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5M7 13c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m3.5 0c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m3.5 0c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5M10.5 16c.3 0 .5-.2.5-.5V14c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.5c0 .3.2.5.5.5m14-5.5c-.3-.2-.7-.3-1.1-.3h-2.1c-.2-1.3-1-2.4-2.1-3.1l-.3-.2c-.3-.2-.7-.1-.8.2l-.2.4c-.1.3 0 .6.3.8l.3.2c.8.5 1.3 1.3 1.4 2.2h-12c-.3 0-.5.2-.5.5v7.5c0 1.9 1.6 3.5 3.5 3.5h10.3c1.9 0 3.5-1.6 3.5-3.5v-2.1c.1-1.3-.2-2.7-.8-3.9"/></svg>,
  Java: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>,
  Assembly: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>,
  Verilog: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="2" x2="12" y2="22"></line></svg>,
  Linux: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2c3-1.5 5-4.5 5-8a9 9 0 0 0-9-9z"/></svg>,
  SQL: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
};

export default function TechStackOrbit() {
  const [activeTech, setActiveTech] = useState({ name: 'CORE STACK', level: 'SYS', years: 'ACTV' });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      setMousePos({ x: moveX, y: moveY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" className="relative min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden bg-spider-dark/30 scroll-mt-24 mb-32 z-10 w-full text-white">
      
      {/* Decorative Title */}
      <div className="absolute top-32 left-10 sm:left-1/4 z-20 border-l-2 border-spider-magenta pl-6">
        <span className="font-mono text-spider-magenta text-xs tracking-[0.3em] uppercase block mb-2">
          Technical Competencies
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
          Core Matrix<span className="text-spider-magenta">.</span>
        </h2>
      </div>

      <div className="prism-viewport">
        <div className="stack-wrapper">
          {/* Concentric Refraction Ring */}
          <div className="refraction-bg" />
          
          <div className="orbit-container" id="orbit" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
            {TECH_NODES.map((tech, i) => {
              const Icon = TechLogos[tech.icon as keyof typeof TechLogos];
              return (
                <div 
                  key={tech.name} 
                  className={`node node-${i+1}`}
                  onMouseEnter={() => {
                    setActiveTech({ name: tech.name, level: tech.level, years: tech.years });
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setActiveTech({ name: 'CORE STACK', level: 'SYS', years: 'ACTV' });
                    setIsHovered(false);
                  }}
                >
                  <div className="node-glass" />
                  <Icon className="w-8 h-8 pointer-events-none" strokeWidth={1.5} />
                </div>
              );
            })}
          </div>

          <div 
            className="prism-core"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <span className="core-label">System Architecture</span>
            <h1 className="core-title prism-text" data-text={activeTech.name}>
              {activeTech.name}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-6 opacity-90 transition-opacity">
              <div className="flex flex-col items-center">
                  <span className="font-mono text-2xl font-black text-spider-magenta leading-none mb-1">{activeTech.level}</span>
                  <span className="font-mono text-[9px] text-spider-silver/60 uppercase tracking-widest">Proficient</span>
              </div>
              <div className="h-8 w-px bg-spider-purple/40" />
              <div className="flex flex-col items-center">
                  <span className="font-mono text-2xl font-black text-spider-blue leading-none mb-1">{activeTech.years}</span>
                  <span className="font-mono text-[9px] text-spider-silver/60 uppercase tracking-widest">Years Exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
