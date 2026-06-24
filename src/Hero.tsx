import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const words = ["Programmer", "Creator", "Designer", "Architect", "Engineer"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[100vh] mb-32 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto relative overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-spider-purple/10 rounded-full blur-[120px] -z-10" />

      {/* Hero Content Wrapper */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="relative z-20 flex flex-col items-center w-full max-w-4xl"
      >
        {/* Top Text Name */}
        <h1 className="text-5xl sm:text-8xl font-black tracking-tight mb-2 uppercase">
          Kaiden Bell
        </h1>

        {/* The Animated Word Layer */}
        <div className="h-16 sm:h-24 flex items-center justify-center relative w-full mb-8 z-10">
          <span className="text-3xl sm:text-5xl font-light text-spider-silver/60 mr-4">A</span>
          <div className="relative h-full flex items-center justify-start w-64 sm:w-96">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute text-3xl sm:text-5xl font-black text-spider-magenta uppercase tracking-tighter"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Profile Picture / Vector Container */}
        {/* Placed at a higher z-index (z-30) to overlap the flipping text if needed */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative z-30 mb-8 border-4 border-spider-purple/20 rounded-full overflow-hidden bg-spider-black/50 backdrop-blur-xs flex items-center justify-center">
          <img 
            src="/path-to-your-portrait.png" 
            alt="Kaiden Bell" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Subtitle Description */}
        <p className="max-w-xl text-lg text-spider-silver/80 font-medium leading-relaxed mb-10">
          Building digital solutions and bridging the gap between elegant software intent and physical reality.
        </p>

        {/* Call to Actions */}
        <div className="flex gap-4 z-40">
          <a href="#projects" className="bg-spider-magenta text-white px-8 py-4 font-black uppercase tracking-tighter hover:bg-white hover:text-spider-magenta transition-all flex items-center gap-2 group">
            View Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="border border-spider-purple/40 px-8 py-4 font-black uppercase tracking-tighter hover:bg-spider-purple/10 transition-all">
            Connect
          </a>
        </div>
      </motion.div>
    </section>
  );
}
