'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    title: 'Automated ETL Pipelines',
    year: '2023',
    role: 'Data Engineering',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    ],
    description: 'High-throughput data pipelines moving millions of records per minute with zero downtime.',
  },
  {
    title: 'Distributed System Architect',
    year: '2022',
    role: 'Backend Engineering',
    images: [
      'https://images.unsplash.com/photo-1618401471353-b98a5233c591?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80',
    ],
    description: 'Designed and deployed a fault-tolerant microservices architecture scalable across global regions.',
  },
  {
    title: 'CI/CD Automation Matrix',
    year: '2021',
    role: 'DevOps / Platform',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80',
    ],
    description: 'Reduced deployment times from hours to minutes utilizing dynamic containerized environments.',
  }
];

export default function ProjectsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(projects.map(() => 0));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* Sticky Background Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {projects.map((project, index) => {
          const start = index * (1 / projects.length);
          const end = (index + 1) * (1 / projects.length);
          const fadeStart = start - 0.1;

          const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, fadeStart), start, end, Math.min(1, end + 0.1)],
            [0, 1, 1, 0]
          );

          const scale = useTransform(
            scrollYProgress,
            [start, end],
            [1, 1.1]
          );

          return (
            <motion.div
              key={index}
              style={{ opacity, scale }}
              className="absolute inset-0 w-full h-full"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${project.images[activeImageIndex[index]]})` }}
              />
              <div className="absolute inset-0 bg-black/75" /> {/* Dark overlay for text readability */}
            </motion.div>
          );
        })}
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 -mt-[100vh]">
        {projects.map((project, index) => (
          <div
            key={index}
            className="h-screen w-full flex items-center justify-center text-white px-6 md:px-12 relative"
          >
            {/* Project Navigation Layer */}
            <div className="absolute bottom-12 left-0 w-full flex justify-between items-center px-12 z-20 font-mono text-[11px] tracking-widest uppercase">
              <button
                onClick={() => setActiveImageIndex(prev => {
                  const newState = [...prev];
                  newState[index] = newState[index] === 0 ? project.images.length - 1 : newState[index] - 1;
                  return newState;
                })}
                className="hover:text-red-500 transition-colors"
              >
                (Prev.)
              </button>

              <div className="flex gap-1 text-[#EBEBEB]/60">
                {project.images.map((_, dotIndex) => (
                  <span key={dotIndex} className={activeImageIndex[index] === dotIndex ? "text-white" : ""}>
                    •
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveImageIndex(prev => {
                  const newState = [...prev];
                  newState[index] = (newState[index] + 1) % project.images.length;
                  return newState;
                })}
                className="relative group hover:text-red-500 transition-colors"
              >
                <div className="absolute inset-0 bg-cyan-400 rounded-full scale-0 group-hover:scale-150 transition-transform -z-10 mix-blend-screen opacity-50 blur-sm"></div>
                (Next)
              </button>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-none">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <p className="font-mono text-sm text-[#EBEBEB]/80 mb-4 tracking-widest uppercase">{project.role} // {project.year}</p>
                  <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tighter uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{project.title}</h2>
                  <p className="text-base text-white/90 font-mono max-w-md leading-relaxed">{project.description}</p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
