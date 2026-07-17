'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useAnimation } from '@/lib/animation-context';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Developer-themed Background Wallpaper */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/40" /> {/* Dark overlay for better contrast */}

      {/* Small Text - Kartik's Info */}
      <motion.div
        style={{ opacity }}
        className="absolute top-24 left-6 md:top-32 md:left-12 z-30 text-xs md:text-sm font-mono text-white max-w-xs md:max-w-sm tracking-wide leading-relaxed"
      >
        <p>Architect of high-speed automation systems.</p>
        <p className="mt-2 text-slate-400">Crafting frameworks that reduce years of execution into minutes.</p>
      </motion.div>

      {/* Central Male Character Image */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
          alt="Male Character"
          className="w-3/4 md:w-1/3 object-cover object-center aspect-[3/4] mix-blend-lighten opacity-80 grayscale contrast-125"
        />
      </motion.div>

      {/* Giant Typography */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
        className="relative z-10 w-full flex justify-center pointer-events-none"
      >
        <h1 className="text-[15vw] md:text-[20vw] font-display font-bold text-white leading-none select-none tracking-tighter uppercase text-center mix-blend-difference">
          KARTIK
        </h1>
      </motion.div>

      {/* Scroll indicator (Optional but good for UX) */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-12 z-30 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/50">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </div>
  );
}
