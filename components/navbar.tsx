'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Terminal, Command, User, Briefcase, Mail, Cpu, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [activeSegment, setActiveSegment] = useState('hero');
  const { scrollY } = useScroll();
  
  const navItems = [
    { id: 'hero', label: 'Start', icon: User },
    { id: 'experience', label: 'Journey', icon: Zap },
    { id: 'skills', label: 'Arsenal', icon: Cpu },
    { id: 'projects', label: 'Builds', icon: Briefcase },
    { id: 'tools', label: 'Lab', icon: Command },
    { id: 'contact', label: 'Talk', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'projects', 'tools', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSegment(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 p-2 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-300 group",
              activeSegment === item.id 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            )}
          >
            {activeSegment === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="flex items-center gap-2">
              <item.icon size={18} />
              <span className="hidden md:block text-sm font-medium">{item.label}</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden">
              {item.label}
            </div>
          </button>
        ))}
      </motion.div>
    </nav>
  );
}
