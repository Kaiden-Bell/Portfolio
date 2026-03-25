import React, { useRef, useEffect, useState } from 'react';

export interface Project {
  title: string;
  tech: string;
  description: string[];
  icon: React.ReactNode;
  source?: string;
  demo?: string;
}

interface ProjectCardstackProps {
  projects: Project[];
}

export default function ProjectCardstack({ projects }: ProjectCardstackProps) {
  // Multiply projects by 6 to ensure we have enough width for seamless infinite scrolling
  const marqueeProjects = [...projects, ...projects, ...projects, ...projects, ...projects, ...projects];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag refs
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current) {
      // Start at block 2 to allow scrolling backward immediately
      const arrayWidth = containerRef.current.scrollWidth / 6;
      containerRef.current.scrollLeft = arrayWidth * 2;
    }
  }, [projects]);

  // Auto-scroll loop & infinite seamless reset logic
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    const speed = 0.05; // pixels per ms
    
    const step = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      const container = containerRef.current;
      
      if (container) {
        if (!isHovered && !isDragging) {
          container.scrollLeft += speed * dt;
        }

        const arrayWidth = container.scrollWidth / 6;
        // If we scrolled past 4 blocks, jump back to 2 blocks
        if (container.scrollLeft >= arrayWidth * 4) {
          container.scrollLeft -= arrayWidth * 2;
        }
        // If we dragged/scrolled back before 1 block, jump forward to 3 blocks
        else if (container.scrollLeft <= arrayWidth) {
          container.scrollLeft += arrayWidth * 2;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  return (
    <section id="projects" className="tectonic-container scroll-mt-24">
      <div className="section-header">
        <h2>System.Inventory</h2>
        <p>Monolithic Prototypes</p>
      </div>

      <div 
        className="marquee"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveDrag}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="marquee-track">
          {marqueeProjects.map((project, idx) => {
            const modId = String((idx % projects.length) + 1).padStart(3, '0');
            const axisTag = project.tech.split(',')[0].toUpperCase().replace(/\s+/g, '-');
            
            return (
              <div 
                key={idx} 
                className={`monolith ${isDragging ? 'pointer-events-none' : ''}`}
                onMouseMove={(e) => {
                  if (isDragging) return;
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  
                  card.style.transform = `perspective(1000px) translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0) scale(1)`;
                }}
              >
                <div className="id-tag">
                  MOD_{modId} / {axisTag}
                  <span>ACTIVE</span>
                </div>
                
                <div className="monolith-title">
                  <h3>{project.title}</h3>
                  <p>{project.description[0]}</p>
                </div>
                
                <div className="visual-core">
                  <div className="machined-shape flex items-center justify-center">
                    <div className="text-spider-magenta scale-150 relative z-10">
                      {project.icon}
                    </div>
                  </div>
                </div>
                
                <div className="specs">
                  <div className="spec-item">
                    <label>Technology</label>
                    <span className="value text-spider-silver truncate block" title={project.tech}>
                      {project.tech.split(',').length > 1 ? project.tech.split(',')[1].trim() : project.tech}
                    </span>
                  </div>
                  <div className="spec-item">
                    <label>Operations</label>
                    <div className="flex gap-3 text-spider-blue text-xs uppercase relative z-10 font-mono items-center mt-1">
                      {project.source && (
                        <a 
                          href={project.source} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="hover:text-spider-magenta transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Source
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="hover:text-spider-magenta transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
