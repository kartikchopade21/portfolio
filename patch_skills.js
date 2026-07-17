const fs = require('fs');

let content = fs.readFileSync('components/skills.tsx', 'utf8');

// I need to add 'Lock' and 'Bot' to lucide-react imports if we want to use them for new categories
content = content.replace(
  "import { Layers, Database, Terminal, Cpu, Cloud, Code, GitBranch } from 'lucide-react';",
  "import { Layers, Database, Terminal, Cpu, Cloud, Code, GitBranch, Lock, Bot, FileJson } from 'lucide-react';"
);

const newSkillCategories = `  const skillCategories = [
    {
      title: "Languages & Scripting",
      icon: Code,
      skills: ["Python", "Java", "JavaScript", "SQL (MySQL, Oracle)", "HTML", "CSS"],
      color: "bg-blue-500",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Automation & Testing",
      icon: Terminal,
      skills: ["Playwright", "Postman", "REST API Automation", "API Testing", "JSON", "Test Frameworks"],
      color: "bg-purple-500",
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: "API Authentication",
      icon: Lock,
      skills: ["OAuth2", "JWT", "API Keys", "Certificate-Based Auth", "SHA-256", "HMAC-SHA256 Token Gen"],
      color: "bg-red-500",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "AI / GenAI",
      icon: Bot,
      skills: ["RAG", "LLMs", "spaCy", "NLP", "Speech-to-Text (STT)", "Prompt Engineering", "Sentence Transformers", "OpenAI", "FAISS", "Pinecone"],
      color: "bg-emerald-500",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Data & ETL",
      icon: Database,
      skills: ["Pandas", "NumPy", "OpenPyXL", "ETL Pipelines", "Data Migration", "Data Reconciliation"],
      color: "bg-teal-500",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Data Formats",
      icon: FileJson,
      skills: ["JSON", "XML", "CSV"],
      color: "bg-yellow-500",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: ["Jenkins (CI/CD)", "Docker", "AWS", "Git", "GitHub"],
      color: "bg-orange-500",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Frameworks & Tools",
      icon: Layers,
      skills: ["FastAPI", "Django", "Spring", "WebSockets", "Google Drive API", "Slack API", "Charles Proxy", "Jira"],
      color: "bg-pink-500",
      className: "md:col-span-3 md:row-span-1"
    }
  ];`;

const oldSkillCategoriesRegex = /const skillCategories = \[[\s\S]*?\];/m;
content = content.replace(oldSkillCategoriesRegex, newSkillCategories);

// Replace mapping to use motion.span
const oldSkillMap = `{cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10">
                    {skill}
                  </span>
                ))}`;

const newSkillMap = `{cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10 cursor-default"
                    whileHover={{ scale: 1.05, backgroundColor: '#3b82f6', color: '#ffffff', borderColor: '#3b82f6' }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {skill}
                  </motion.span>
                ))}`;

content = content.replace(oldSkillMap, newSkillMap);

fs.writeFileSync('components/skills.tsx', content);
