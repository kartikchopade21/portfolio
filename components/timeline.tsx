'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const timelineEvents = [
  {
    year: '2024',
    title: 'HotelKey - Nagpur',
    subtitle: 'Automation Engineer',
    description: 'Building and maintaining end-to-end automation pipelines that eliminate manual intervention, reduce processing time, and scale operations for a global hospitality SaaS product. Global Exposure: Delivered onsite client consultation across UK (London, Edinburgh, Glasgow) and Dar es Salaam, Tanzania — leading data migration calls and translating technical insights into business decisions for enterprise clients.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    tags: ['FastAPI', 'WebSockets', 'Python', 'Jenkins', 'API', 'Playwrigth', 'Pandas', 'Postman', 'SQL']
  },
  {
    year: '2023',
    title: 'Bachelor of Engineering',
    subtitle: 'Computer Science',
    description: 'Graduated with a GPA of 70.05% from Sant Gadge Baba Amravati University, establishing a strong foundation in core CS principles.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    tags: ['Data Structures', 'Algorithms', 'OS']
  },
  {
    year: '2020',
    title: 'Diploma in Computer Engineering',
    subtitle: 'MSBTE',
    description: 'Completed diploma with 86.29% score, focusing on software development and technical systems.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    tags: ['Embedded Systems', 'C/C++']
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto py-32 overflow-visible">
      {/* Central Progress Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-white/10 -translate-x-1/2 hidden md:block" />
      <motion.div 
        style={{ scaleY, originY: 0 }}
        className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 to-purple-600 -translate-x-1/2 hidden md:block z-10 rounded-full"
      />

      <div className="space-y-32 md:space-y-64">
        {timelineEvents.map((event, idx) => (
          <TimelineItem key={idx} event={event} index={idx} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event, index }: { event: typeof timelineEvents[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center justify-between gap-12 group",
      !isEven && "md:flex-row-reverse"
    )}>
      {/* Date Marker */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-full bg-white dark:bg-black border-4 border-blue-500 flex items-center justify-center text-[10px] font-bold shadow-lg"
        >
          {event.year}
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[42%] space-y-6"
      >
        <div className="space-y-2">
          <span className="text-blue-500 font-mono text-sm tracking-tighter block md:hidden">{event.year}</span>
          <h3 className="text-4xl font-display font-medium text-slate-900 dark:text-white uppercase tracking-tight">{event.title}</h3>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">{event.subtitle}</p>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {event.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Visual Asset (Interactive Image) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-[48%] relative aspect-video rounded-3xl overflow-hidden shadow-2xl group/img"
      >
        <Image 
          src={event.image} 
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[2s] group-hover/img:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="w-full h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-1/3 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
