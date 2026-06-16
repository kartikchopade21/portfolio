'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  },
};

export default function Hero() {
  const { settings } = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* High-end decorative background */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
          <svg width="100%" height="100%" className="blur-[1px]">
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-blue-500/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-purple-500/10 blur-[150px] rounded-full"
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl px-6 pt-32 pb-12 lg:pt-48">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8 md:gap-12"
        >
          <motion.div variants={item} className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-blue-500/50" />
            <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono tracking-[0.3em] uppercase">
              Orchestrating Autonomy
            </div>
            <div className="h-[1px] w-12 bg-blue-500/50" />
          </motion.div>
          
          <motion.div variants={item} className="space-y-4">
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-display font-bold tracking-tighter leading-[0.8] text-slate-900 dark:text-white uppercase">
              KARTIK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">CHOPADE</span>
            </h1>
          </motion.div>

          <motion.p 
            variants={item}
            className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl font-light leading-snug tracking-tight"
          >
            Architect of high-speed automation systems. <br className="hidden md:block" /> 
            Crafting frameworks that reduce years of execution into minutes.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:pr-16"
            >
              Start Experience
              <ArrowRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <div className="flex gap-8">
              {['FastAPI', 'Pandas', 'Jenkins'].map((tech) => (
                <div key={tech} className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </div>
  );
}
