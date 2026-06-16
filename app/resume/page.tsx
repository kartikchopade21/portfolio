'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12 px-6 font-sans">
      <div className="max-w-[850px] mx-auto bg-white dark:bg-zinc-900 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-white/5">
        
        {/* Navigation Bar */}
        <div className="px-8 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <div className="flex gap-4 print:hidden">
             <button 
              onClick={() => window.print()} 
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Print Page
            </button>
            <a 
              href="/resume.pdf" 
              download 
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              Download Original PDF
            </a>
          </div>
        </div>

        {/* Resume Content */}
        <div className="p-12 md:p-16 space-y-10 text-slate-800 dark:text-slate-200">
          {/* Header */}
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-slate-900 dark:text-white uppercase">
              Kartik <span className="text-blue-500">Chopade</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-blue-500" /> +91 8668551898</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> Nagpur, Maharashtra</span>
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-blue-500" /> kartikchopde21@gmail.com</span>
              <span className="flex items-center gap-1.5"><Linkedin size={14} className="text-blue-500" /> LinkedIn</span>
            </div>
          </header>

          <hr className="border-slate-100 dark:border-white/5" />

          {/* Professional Summary */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Professional Summary</h2>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 font-light">
              Automation Engineer with 2+ years of experience designing, developing, and deploying scalable Python automation frameworks, 
              ETL pipelines, and CI/CD integrations across global SaaS environments. Proven expertise in API automation, data migration, and 
              building enterprise-grade tools using FastAPI, Pandas, Jenkins, and AWS. Achieved a 60% reduction in onboarding time, 70% 
              faster audit cycles, and full elimination of manual workflows across 15+ environments.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { label: 'Languages & Scripting', value: 'Python, Java, JavaScript, SQL (MySQL, Oracle), HTML, CSS' },
                { label: 'Automation & Testing', value: 'Playwright, Postman, REST API Automation, API Testing, JSON' },
                { label: 'Data & ETL', value: 'Pandas, NumPy, OpenPyXL, ETL Pipelines, Data Migration' },
                { label: 'DevOps & Cloud', value: 'Jenkins (CI/CD), Docker, AWS, Git, GitHub' },
                { label: 'Frameworks & Tools', value: 'FastAPI, Django, Spring, WebSockets, Google Drive API' }
              ].map((skill, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{skill.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{skill.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Professional Experience</h2>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Automation Engineer</h3>
                    <p className="text-blue-500 font-medium">HotelKey — Nagpur</p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">April 2024 – Present</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Web-Based Automation Orchestrator (FastAPI + ETL Platform)</h4>
                    <ul className="list-disc list-outside ml-4 text-sm space-y-2 text-slate-500 dark:text-slate-400 font-light">
                      <li>Designed and developed a multi-user asynchronous web application using FastAPI to orchestrate hotel management configuration workflows, cutting manual onboarding time by 60%.</li>
                      <li>Architected real-time, isolated logging for concurrent users via WebSockets and Python contextvars, ensuring thread-safe console output streaming.</li>
                      <li>Engineered an ETL pipeline using Pandas and OpenPyXL to extract, sanitize, and parse complex Google Sheets into structured CSV datasets.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Delta Comparison Tool (Python + Jenkins)</h4>
                    <ul className="list-disc list-outside ml-4 text-sm space-y-2 text-slate-500 dark:text-slate-400 font-light">
                      <li>Built a Python utility using Pandas and python-jenkins to remotely trigger SQL queries across 15+ environments and parse Jenkins console logs, reducing log review time by 3x.</li>
                      <li>Developed data reconciliation logic performing deep multi-environment database comparisons, identifying row-level and column-level discrepancies.</li>
                      <li>Generated conditionally formatted, color-coded Excel delta reports via OpenPyXL, processing 1,000,000+ row datasets in under 5 minutes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Education</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">Bachelor of Engineering – Computer Science</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Sant Gadge Baba Amravati University</p>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">2023 | GPA: 70.05%</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">Diploma in Computer Engineering</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Maharashtra State Board of Technical Education</p>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">2020 | Score: 86.29%</span>
              </div>
            </div>
          </section>
        </div>

        <div className="px-12 py-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400">
            Generated Portfolio Asset &bull; Kartik Chopade
          </p>
        </div>
      </div>
    </div>
  );
}
