'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Activity, FileJson, Play, RotateCcw, CheckCircle2, AlertCircle, Server, Database, ShieldCheck, Cpu, Loader2 } from 'lucide-react';
import { useAnimation } from '@/lib/animation-context';
import { cn } from '@/lib/utils';

import { GoogleGenAI } from "@google/genai";
import { KARTIK_CONTEXT } from '@/lib/ai-config';

export default function Tools() {
  const [activeTool, setActiveTool] = useState('terminal');
  const { settings } = useAnimation();

  const toolTabs = [
    { id: 'terminal', label: 'Remote Orchestrator', icon: Terminal },
    { id: 'pipeline', label: 'Flow Simulator', icon: Play },
    { id: 'api', label: 'Perf Analyzer', icon: Activity },
    { id: 'json', label: 'JSON Formatter', icon: FileJson },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-slate-800 dark:text-white">Developer Toolbox</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Interactive utilities built for specialized automation engineering and data reconciliation workflows.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Tabs */}
        <div className="flex lg:flex-col lg:w-64 gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
          {toolTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl text-left transition-all shrink-0 lg:shrink",
                activeTool === tab.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-xl"
                  : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-800"
              )}
            >
              <tab.icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tool Content Area */}
        <div className="flex-grow p-1 rounded-[2.5rem] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-950 shadow-inner overflow-hidden">
          <div className="h-full w-full bg-white dark:bg-black rounded-[2.4rem] p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTool === 'terminal' && <TerminalTool key="terminal" />}
              {activeTool === 'pipeline' && <PipelineTool key="pipeline" />}
              {activeTool === 'api' && <ApiTool key="api" />}
              {activeTool === 'json' && <JsonTool key="json" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalTool() {
  const [logs, setLogs] = useState<Array<{ role: 'user' | 'bot' | 'system', content: string }>>([
    { role: 'system', content: '>>> Python 3.12.0 (Automation Build)' },
    { role: 'system', content: '>>> Initializing Remote Orchestrator...' },
    { role: 'system', content: '>>> Secure link established. Listening for queries...' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs, isTyping]);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setLogs(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: KARTIK_CONTEXT + "\nRespond in a technical terminal-friendly style. One or two concise paragraphs.",
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "Command failed: Neural bridge connection lost.";
      setLogs(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Terminal AI Error:", error);
      setLogs(prev => [...prev, { role: 'bot', content: "ERROR 503: Service Unavailable. Retrying tunnel connection..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full font-mono text-xs md:text-sm"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-slate-400 uppercase tracking-widest text-[10px]">kartik@remote-orchestrator:~</span>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-4 mb-4 scrollbar-hide text-slate-700 dark:text-slate-300">
        {logs.map((log, i) => (
          <div key={i} className={cn(
            "leading-relaxed",
            log.role === 'user' ? "text-blue-500" : log.role === 'system' ? "opacity-60" : "text-emerald-500"
          )}>
            {log.role === 'user' && <span className="mr-2">$</span>}
            {log.content}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-emerald-500/50">
            <Loader2 size={12} className="animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleRun} className="flex gap-2">
        <span className="text-blue-500">$</span>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ex: 'Tell me about your FastAPI project' or 'What skills do you have?'"
          className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          disabled={isTyping}
          autoFocus
        />
        <button type="submit" disabled={isTyping} className="p-1 hover:text-blue-500 transition-colors disabled:opacity-30">
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}

function ApiTool() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTest = () => {
    setLoading(true);
    setComplete(false);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
      setResults({
        latency: (Math.random() * 100 + 50).toFixed(2),
        status: 200,
        nodes: 15,
        successRate: '99.98%'
      });
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <div className="relative mb-8">
        <div className={cn(
          "w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500",
          loading ? "border-blue-500 border-t-transparent animate-spin" : complete ? "border-emerald-500 bg-emerald-500/10" : "border-slate-200 dark:border-white/10"
        )}>
          {complete ? <CheckCircle2 size={48} className="text-emerald-500" /> : <Activity size={48} className="text-slate-400" />}
        </div>
      </div>

      <h3 className="text-2xl font-display font-medium mb-2 text-slate-800 dark:text-white">API Performance Sandbox</h3>
      <p className="text-slate-500 mb-8 max-w-sm">Test endpoint resilience and reconciliation latency across global clusters.</p>

      {complete && results && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Latency</div>
            <div className="text-xl font-mono text-blue-500">{results.latency}ms</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Success</div>
            <div className="text-xl font-mono text-blue-500">{results.successRate}</div>
          </div>
        </motion.div>
      )}

      <button
        onClick={runTest}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium transition-transform active:scale-95 disabled:opacity-50"
      >
        {loading ? "Running Tests..." : <><Play size={18} /> Trigger Pipeline</>}
      </button>
    </motion.div>
  );
}

function PipelineTool() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const { settings } = useAnimation();

  const stages = [
    { id: 1, label: 'Source', icon: Server },
    { id: 2, label: 'Transform', icon: Cpu },
    { id: 3, label: 'Validate', icon: ShieldCheck },
    { id: 4, label: 'Load', icon: Database },
  ];

  const runPipeline = async () => {
    setStatus('running');
    setStep(1);
    setLogs(['[SYSTEM] Initializing ETL Bridge...']);
    
    const sequence = [
      { log: '[FETCH] Extracting 1.2M rows from 15 nodes...', delay: 1000 },
      { log: '[TRANSFORM] Mapping schemas with sub-second precision...', delay: 1200, nextStep: 2 },
      { log: '[VALIDATE] Performing deep-reconciliation checks...', delay: 1500, nextStep: 3 },
      { log: '[LOAD] Conditional format applied. Excel delta generated.', delay: 1200, nextStep: 4 },
      { log: '[SUCCESS] Pipeline completed. Reliability: 99.98%', delay: 500, finalStatus: 'success' as const }
    ];

    for (const s of sequence) {
      await new Promise(r => setTimeout(r, s.delay / settings.speed));
      setLogs(prev => [...prev, s.log]);
      if (s.nextStep) setStep(s.nextStep);
      if (s.finalStatus) setStatus(s.finalStatus);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-xl font-display font-medium">Orchestration Simulator</h3>
        <button 
          onClick={runPipeline}
          disabled={status === 'running'}
          className={cn(
            "px-6 py-2 rounded-full font-medium transition-all active:scale-95 flex items-center gap-2",
            status === 'running' ? "bg-slate-100 dark:bg-white/5 text-slate-400" : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          {status === 'running' ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
          {status === 'running' ? "Orchestrating..." : "Start Pipeline"}
        </button>
      </div>

      <div className="relative flex justify-between items-center mb-16 px-4">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 dark:bg-white/5 -translate-y-1/2 -z-10" />
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${(step - 1) * 33.33}%` }}
        />

        {stages.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                backgroundColor: step >= s.id ? '#3b82f6' : 'transparent',
                borderColor: step >= s.id ? '#3b82f6' : 'currentColor',
                scale: step === s.id ? 1.2 : 1,
              }}
              className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-500",
                step >= s.id ? "text-white" : "text-slate-300 dark:text-zinc-700"
              )}
            >
              <s.icon size={20} />
            </motion.div>
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-semibold",
              step >= s.id ? "text-blue-500" : "text-slate-400"
            )}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-grow p-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-white/5 font-mono text-[10px] md:text-xs overflow-y-auto space-y-1">
        {logs.length === 0 ? (
          <div className="text-slate-400 italic">No active logs. Ready for deployment...</div>
        ) : (
          logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -5 }} 
              animate={{ opacity: 1, x: 0 }} 
              key={i} 
              className={cn(log.includes('[SUCCESS]') ? "text-emerald-500" : "text-slate-600 dark:text-slate-400")}
            >
              <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function JsonTool() {
  const [text, setText] = useState('{\n  "status": "ready",\n  "project": "Orchestrator",\n  "tools_enabled": ["terminal", "api", "json"],\n  "metadata": {\n    "author": "Kartik",\n    "version": "1.0.2"\n  }\n}');
  const [formatted, setFormatted] = useState('');

  const format = () => {
    try {
      const obj = JSON.parse(text);
      setFormatted(JSON.stringify(obj, null, 2));
    } catch (e) {
      setFormatted('// Invalid JSON Payload detected');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full gap-4"
    >
      <div className="grid md:grid-cols-2 gap-4 flex-grow h-0">
        <div className="flex flex-col font-mono text-xs">
          <label className="text-[10px] text-slate-400 uppercase mb-2">Input Raw Source</label>
          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-grow p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-blue-500/50 transition-colors resize-none"
          />
        </div>
        <div className="flex flex-col font-mono text-xs">
          <label className="text-[10px] text-slate-400 uppercase mb-2">Authenticated Output</label>
          <div className="flex-grow p-4 rounded-2xl bg-slate-900 text-blue-400 border border-slate-800 overflow-y-auto whitespace-pre">
            {formatted || '// Click format to process'}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
        <button onClick={() => { setText(''); setFormatted(''); }} className="px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          Clear
        </button>
        <button onClick={format} className="px-6 py-2 rounded-full bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">
          Execute Reformatter
        </button>
      </div>
    </motion.div>
  );
}
