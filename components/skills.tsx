'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Layers, Database, Terminal, Cpu, Cloud, Code, GitBranch } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';

export default function Skills() {
  const { settings } = useAnimation();

  const skillCategories = [
    {
      title: "Languages & Scripting",
      icon: Code,
      skills: ["Python", "JavaScript", "Java", "SQL", "HTML", "CSS"],
      color: "bg-blue-500",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Automation & Testing",
      icon: Terminal,
      skills: ["Playwright", "Postman", "REST API", "API Testing", "JSON"],
      color: "bg-purple-500",
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: "Data & ETL",
      icon: Database,
      skills: ["Pandas", "NumPy", "OpenPyXL", "ETL Pipelines", "Data Migration"],
      color: "bg-emerald-500",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: ["Jenkins (CI/CD)", "Docker", "AWS", "Git", "GitHub"],
      color: "bg-orange-500",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Frameworks & Tools",
      icon: Layers,
      skills: ["FastAPI", "Django", "Spring", "WebSockets", "Slack API"],
      color: "bg-pink-500",
      className: "md:col-span-3 md:row-span-1"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-slate-800 dark:text-white">Technical Arsenal</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl">
          A focused collection of tools and technologies I use to build robust, autonomous systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5 / settings.speed, 
              delay: idx * 0.1,
              ease: "easeOut" 
            }}
            whileHover={{ y: -5 }}
            className={`group relative p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900 overflow-hidden ${cat.className}`}
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl transition-colors ${cat.color} bg-opacity-10 dark:bg-opacity-20 text-slate-900 dark:text-white`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="text-sm font-semibold tracking-tight uppercase">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative background icon */}
            <cat.icon size={120} className="absolute -bottom-8 -right-8 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
