import React, { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import './ExperienceTrack.css';

interface Experience {
  role: string;
  company: string;
  period: string;
  details: string;
  tech: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "NSHE - Circulation Senior Worker",
    company: "University of Nevada, Reno, NSHE",
    period: "2023 - PRES",
    tech: ["Customer Service", "Inventory Management", "Team Leadership"],
    details: "Managed circulation operations, trained new staff, and optimized library workflows while maintaining high standards of user support and operational efficiency."
  },
  {
    role: "Freelance Web & Systems Developer",
    company: "Self-Employed",
    period: "2024 — PRES",
    tech: ["Full-Stack", "Backend APIs", "Hosting/Domains"],
    details: "Designed and deployed full-stack production websites including backend APIs and database integration. Managed hosting environments and domain configuration while implementing responsive design optimizations."
  },
  {
    role: "Independent IT & Systems Technician",
    company: "Self-Employed",
    period: "2025 — PRES",
    tech: ["Hardware Diagnostics", "Firmware", "System Hardening"],
    details: "Diagnosed and resolved hardware, firmware, and OS-level issues across diverse client systems. Performed component-level troubleshooting, system configuration, secure system hardening, and reliability optimization."
  },
];

const ExperienceRow = ({ exp, index }: { exp: Experience, index: number }) => {
  const [bgStyle, setBgStyle] = useState({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBgStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(76, 0, 92, 0.4) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    setBgStyle({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="exp-row group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={bgStyle}
    >
      <div className="exp-year">{exp.period}</div>
      <div className="exp-content">
        <span className="role">{exp.role}</span>
        <h3>{exp.company}</h3>
        <p className="details">{exp.details}</p>
      </div>
      <div className="exp-tech">
        {exp.tech.map((t, i) => (
          <span key={i} className="tech-tag">{t}</span>
        ))}
      </div>
      <div className="line-indicator"></div>
    </motion.div>
  );
};

export default function ExperienceTrack() {
  return (
    <section className="experience-section">
      <header className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Track<br />Record</h2>
          <div className="meta">// Service History & Engineering</div>
        </motion.div>
      </header>

      <div className="exp-container">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceRow key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
