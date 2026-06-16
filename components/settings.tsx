'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, X, Sliders, Zap, Wind, Power } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useAnimation();

  return (
    <div className="fixed top-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        <SettingsIcon size={20} className={isOpen ? "animate-spin-slow" : ""} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-16 right-0 w-80 p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-blue-500" />
                <h3 className="font-display font-medium">UX Preferences</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Wind size={14} />
                    Animation Speed
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-500">{settings.speed}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => updateSettings({ speed: parseFloat(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Zap size={14} />
                    Effect Intensity
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-500">{Math.round(settings.intensity * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.intensity}
                  onChange={(e) => updateSettings({ intensity: parseFloat(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => updateSettings({ enabled: !settings.enabled })}
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Power size={18} className={settings.enabled ? "text-emerald-500" : "text-slate-400"} />
                    <span className="text-sm font-medium">Motion Enabled</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.enabled ? "bg-blue-500" : "bg-slate-300 dark:bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${settings.enabled ? "left-6" : "left-1"}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
