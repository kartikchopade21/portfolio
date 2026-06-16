'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/navbar';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Tools from '@/components/tools';
import Contact from '@/components/contact';
import Timeline from '@/components/timeline';
import Settings from '@/components/settings';
import LoadingScreen from '@/components/loading-screen';
import Chatbot from '@/components/chatbot';
import Hero from '@/components/hero';
import { useAnimation } from '@/lib/animation-context';

export default function Home() {
  const { settings } = useAnimation();

  return (
    <main className="relative min-h-screen">
      <LoadingScreen />
      <Chatbot />
      
      {/* Background Layer moved to Hero component mostly, but kept some global feel if needed */}
      
      <Navbar />
      
      <section id="hero">
        <Hero />
      </section>

      <section id="experience" className="px-6 md:px-12 lg:px-24">
        <Timeline />
      </section>

      <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-100/30 dark:bg-zinc-950">
        <Skills />
      </section>

      <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-100/50 dark:bg-white/5 backdrop-blur-sm">
        <Projects />
      </section>

      <section id="tools" className="py-24 px-6 md:px-12 lg:px-24">
        <Tools />
      </section>

      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
        <Contact />
      </section>

      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Kartik Chopade. Designed with meticulous intent.</p>
      </footer>

      <Settings />
    </main>
  );
}
