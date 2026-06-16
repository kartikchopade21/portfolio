'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles, Terminal } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/animation-context';
import BotAvatar from './bot-avatar';
import { KARTIK_CONTEXT } from '@/lib/ai-config';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm Kartik's AI assistant. How can I help you explore his automation expertise today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { settings } = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: KARTIK_CONTEXT,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that request right now. I'm currently optimizing my pipelines.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "My connection to the neural engine is currently being throttled. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 / settings.speed, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[90vw] md:w-[400px] h-[500px] flex flex-col bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <BotAvatar isThinking={isTyping} size={40} />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-950" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">AI Kartik</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Status: Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-slate-200 dark:bg-white/10" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Terminal size={14} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black rounded-tr-none" 
                      : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-white/5"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3 mr-auto">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Terminal size={14} />
                  </div>
                  <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 border-t border-slate-100 dark:border-white/5 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me something about Kartik..."
                className="flex-grow bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-all font-sans"
              />
              <button 
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-4 rounded-3xl bg-blue-500 text-white shadow-2xl shadow-blue-500/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        <motion.div
           animate={isOpen ? { rotate: 90, scale: 0.8 } : { rotate: 0, scale: 1 }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.div>
        
        {/* Animated Rings */}
        <span className="absolute inset-0 rounded-3xl border border-white/30 animate-pulse pointer-events-none" />
      </motion.button>
    </div>
  );
}
