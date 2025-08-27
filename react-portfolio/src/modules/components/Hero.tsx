import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const heroVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 40 },
  visible: { opacity: 1, filter: 'blur(0)', y: 0, transition: { duration: 1.1, ease: [0.4,0.8,0.2,1], staggerChildren: 0.08 } }
};

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: .9, ease: [0.4,0.8,0.2,1] } }
};

export default function Hero() {
  const ref = useRef<HTMLDivElement|null>(null);
  const [active,setActive] = useState(false);
  useEffect(()=>{ const t = setTimeout(()=>setActive(true), 60); return ()=> clearTimeout(t); },[]);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -top-80 -left-80 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-brand-600/40 via-fuchsia-600/30 to-indigo-600/30 blur-[180px] animate-pulse" style={{animation: 'blob 20s infinite'}} />
        <div className="pointer-events-none absolute bottom-[-40%] right-[-40%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-tr from-indigo-500/40 via-brand-600/30 to-purple-700/30 blur-[170px] animate-pulse" style={{animation: 'blob 25s infinite reverse'}} />
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-24 text-center"
        data-active={active? 'done':'true'}
      >
        <motion.h1 variants={child} className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.25] pb-2 bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Distorted Creativity Engine
        </motion.h1>
        <motion.p variants={child} className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
          A modern portfolio scaffold showcasing SVG turbulence distortion, masked media reveals, fluid section transitions and motion‑driven interaction layering.
        </motion.p>
        <motion.div variants={child} className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="rounded-full px-6 py-3 bg-brand-600 hover:bg-brand-500 transition-colors shadow-glow text-sm font-medium">
            View Work
          </a>
          <a href="#contact" className="rounded-full px-6 py-3 bg-neutral-800/70 hover:bg-neutral-700/70 backdrop-blur border border-neutral-700 shadow-soft text-sm font-medium">
            Contact
          </a>
        </motion.div>
        <motion.div variants={child} className="mt-16 flex justify-center">
          <a href="#projects" className="group flex flex-col items-center gap-2 text-neutral-600 hover:text-white transition-all duration-300">
            <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:border-white group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] group-hover:bg-purple-600/10 transition-all duration-300">
              <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-xs font-medium">Selected Works</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
