import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

export default function AboutParallax() {
  const container = useRef(null);
  
  // Track scroll over this 300vh container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Scales for individual image layers
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Main background filter dimming
  const filterMain = useTransform(scrollYProgress, [0.55, 0.8], ["brightness(1)", "brightness(0.3)"]);


  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const images = [
    { src: "https://cdn.5280.com/2018/05/Reno_FTG_Jay-Bouchard.jpg" }, // Center Portrait
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60" }, // Circuit Board
    { src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&auto=format&fit=crop&q=60" }, // Hardware Lab
    { src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&auto=format&fit=crop&q=60" }, // Mechanical Parts
    { src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=60" }, // Server Racks
    { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60" }, // Retro Tech / Data
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60" }  // Cyber UI
  ];

  return (
    <section id="about" className="relative z-10">
      {/* 300vh scroll area for parallax zoom */}
      <div ref={container} className="relative h-[300vh] mb-24">
        <div className="sticky top-0 h-screen overflow-hidden bg-spider-black/50 backdrop-blur-sm">
        {images.map(({ src }, index) => {
          const scale = scales[index % scales.length];
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center 
                ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} 
                ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} 
                ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} 
                ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} 
                ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} 
                ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <motion.div 
                className={`relative ${index === 0 ? 'h-[25vh] w-[25vw]' : ''}`}
                style={index === 0 ? { filter: filterMain } : {}}
              >
                <img
                  src={src}
                  alt={`Parallax ${index + 1}`}
                  className={`h-full w-full object-cover border border-spider-purple/20 grayscale contrast-125 ${index === 0 ? 'brightness-75' : 'brightness-50 opacity-60'}`}
                />
                <div className="absolute inset-0 bg-spider-magenta/10 mix-blend-overlay" />
              </motion.div>
            </motion.div>
          );
        })}
        </div>
      </div>
      
      {/* Static text content displayed under the parallax section */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="bg-spider-black/80 p-8 sm:p-12 border-t-2 border-spider-magenta relative overflow-hidden">
          {/* Background schematic accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-spider-magenta/10 clip-path-polygon-[100%_0,100%_100%,0_0] opacity-50 pointer-events-none" />

          <div className="mb-10 text-left">
            <span className="font-mono text-spider-magenta text-xs tracking-[0.3em] uppercase block mb-2">
              Professional Profile
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
              The Transition<span className="text-spider-magenta">.</span>
            </h2>
          </div>

          <div className="space-y-6 text-spider-silver/80 leading-relaxed text-left text-lg">
            <p>
              I started with a strong software foundation, but my curiosity led me deeper into the machine. 
              I've spent the last few years descending the stack—from high-level applications to 
              <span className="text-white font-bold"> low-level systems programming</span> and finally into the 
              physical realm of <span className="text-white font-bold">hardware design</span>.
            </p>
            <p>
              My software background gives me a unique edge in hardware engineering. I don't just design 
              circuits; I design systems that are optimized for the code that will run on them. 
              Whether it's <span className="text-spider-magenta font-mono uppercase text-sm">ARMv7 emulation</span> or real-time 
              embedded control, I build with the full stack in mind.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-spider-purple/20 mt-6">
              <div className="p-4 bg-spider-dark/50 border border-spider-purple/10 border-l-2 border-l-spider-blue">
                <span className="font-mono text-[10px] text-spider-blue block mb-1 tracking-widest uppercase">Location</span>
                <span className="font-bold text-white uppercase text-sm">Sparks, Nevada</span>
              </div>
              <div className="p-4 bg-spider-dark/50 border border-spider-purple/10 border-l-2 border-l-spider-magenta">
                <span className="font-mono text-[10px] text-spider-magenta block mb-1 tracking-widest uppercase">Education</span>
                <span className="font-bold text-white uppercase text-sm">BS CS & Eng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
