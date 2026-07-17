const fs = require('fs');

let content = fs.readFileSync('components/projects.tsx', 'utf8');

content = content.replace(
  "import { ExternalLink, Database, Cpu, Zap, ArrowRight, Github } from 'lucide-react';",
  "import { ExternalLink, Database, Cpu, Zap, ArrowRight, Github, Mic } from 'lucide-react';"
);

const newProject = `    {
      id: 4,
      title: "AIKEY (Voice Assistant for Frontdesk)",
      category: "Voice Assistant + NLP",
      description: "Python-based voice assistant automating front-desk operations. Devised a modular pipeline via HMAC-SHA256 REST APIs, supporting real-time workflows. Delivered a RAG system to reduce hallucinations, and automated payment gateway workflows.",
      tech: ["RAG", "spaCy", "FastAPI", "STT", "SQL"],
      gradient: "from-emerald-500/20 to-teal-500/20",
      icon: Mic
    }`;

content = content.replace(
  `    {
      id: 3,
      title: "Pipeline Automation & Optimization",
      category: "Workflow Engineering",
      description: "Streamlined end-to-end operational pipelines, cutting average processing time by 50% across 6+ recurring workflows. Built 10+ reusable automation scripts reducing human error by 90%.",
      tech: ["Python", "Jenkins", "Docker", "Git", "REST APIs"],
      gradient: "from-amber-500/20 to-orange-500/20",
      icon: Zap
    }
  ];`,
  `    {
      id: 3,
      title: "Pipeline Automation & Optimization",
      category: "Workflow Engineering",
      description: "Streamlined end-to-end operational pipelines, cutting average processing time by 50% across 6+ recurring workflows. Built 10+ reusable automation scripts reducing human error by 90%.",
      tech: ["Python", "Jenkins", "Docker", "Git", "REST APIs"],
      gradient: "from-amber-500/20 to-orange-500/20",
      icon: Zap
    },
${newProject}
  ];`
);

content = content.replace(
  `className="group relative flex flex-col h-full rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"`,
  `className="group relative flex flex-col h-full rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"
            whileHover={{ y: -10 }}`
);

content = content.replace(
  `            {/* Content */}`,
  `            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

            {/* Content */}`
);

content = content.replace(
  `            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">`,
  `            {/* Content */}
            <div className="p-8 flex flex-col flex-grow relative z-10">`
);

fs.writeFileSync('components/projects.tsx', content);
