'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Database, Cpu, Zap, ArrowRight, Github } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';
import Link from 'next/link';

export default function Projects() {
  const { settings } = useAnimation();
  
  const projects = [
    {
      id: 1,
      title: "Web-Based Automation Orchestrator",
      category: "FastAPI + ETL Platform",
      description: "Designed a multi-user asynchronous web app to orchestrate hotel management workflows, cutting onboarding time by 60%. Features real-time log streaming via WebSockets and Python contextvars.",
      tech: ["FastAPI", "WebSockets", "Pandas", "OAuth2", "Asyncio"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      icon: Cpu
    },
    {
      id: 2,
      title: "Delta Comparison Tool",
      category: "Python + Jenkins",
      description: "Automated remote SQL triggers across 15+ environments, processing 1M+ row datasets in under 5 minutes. Replaced a manual 8-hour auditing process with a high-speed reconciled reporting pipeline.",
      tech: ["Python-Jenkins", "Pandas", "SQL", "OpenPyXL", "Concurrent.futures"],
      gradient: "from-purple-500/20 to-pink-500/20",
      icon: Database
    },
    {
      id: 3,
      title: "Pipeline Automation & Optimization",
      category: "Workflow Engineering",
      description: "Streamlined end-to-end operational pipelines, cutting average processing time by 50% across 6+ recurring workflows. Built 10+ reusable automation scripts reducing human error by 90%.",
      tech: ["Python", "Jenkins", "Docker", "Git", "REST APIs"],
      gradient: "from-amber-500/20 to-orange-500/20",
      icon: Zap
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-slate-800 dark:text-white">Selected Works</h2>
          <p className="text-slate-500 dark:text-slate-400">
            A deep dive into high-impact automation systems that solve real-world scalability challenges.
          </p>
        </div>
        <Link 
          href="/resume"
          className="flex items-center gap-2 text-sm font-medium group text-slate-900 dark:text-slate-200 hover:text-blue-500 transition-colors"
        >
          View Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6 / settings.speed, 
              delay: idx * 0.15,
              ease: [0.16, 1, 0.3, 1] as any
            }}
            className="group relative flex flex-col h-full rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"
          >
            {/* Visual Header */}
            <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
              <div className="absolute inset-0 flex items-center justify-center text-slate-800 dark:text-white opacity-20">
                <project.icon size={80} />
              </div>
              <div className="absolute top-6 left-6 px-3 py-1 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-full text-[10px] font-mono tracking-wider uppercase text-slate-900 dark:text-slate-200">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-display font-medium mb-3 text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <Github size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                  <button className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                    Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
