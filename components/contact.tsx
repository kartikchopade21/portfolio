'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Linkedin, Github, ArrowRight } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';

export default function Contact() {
  const { settings } = useAnimation();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 text-slate-800 dark:text-white">Let&apos;s Build <br />Something Scalable</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
              Open for collaboration on automation frameworks, ETL architecture, or any complex engineering challenge.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Email</p>
                <p className="text-slate-700 dark:text-slate-200">kartikchopde21@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Location</p>
                <p className="text-slate-700 dark:text-slate-200">Nagpur, Maharashtra (Available for Onsite)</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            <a href="#" className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <Linkedin size={22} className="text-slate-600 dark:text-slate-400" />
            </a>
            <a href="#" className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <Github size={22} className="text-slate-600 dark:text-slate-400" />
            </a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[32px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Name</label>
                <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 outline-none focus:border-blue-500/50 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 outline-none focus:border-blue-500/50 transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Message</label>
              <textarea required rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 outline-none focus:border-blue-500/50 transition-colors resize-none" placeholder="Let&apos;s discuss the pipeline..." />
            </div>

            <button 
              type="submit"
              disabled={formState !== 'idle'}
              className="w-full group py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-75"
            >
              <span className="flex items-center justify-center gap-2">
                {formState === 'idle' && <>Send Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                {formState === 'sending' && "Initializing Transmission..."}
                {formState === 'sent' && "Message Transmitted ✓"}
              </span>
            </button>
          </form>

          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-slate-100 dark:bg-white/5 rounded-full -z-0" />
        </motion.div>
      </div>
    </div>
  );
}
