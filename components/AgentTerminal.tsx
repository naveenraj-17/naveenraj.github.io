"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ShieldCheck, Cpu, Code2, Activity, Database, Zap, Lock } from "lucide-react";

interface LogEntry {
  year?: string;
  text: string;
  status: "success" | "info" | "warning" | "error" | "system";
  icon?: React.ReactNode;
  delay?: number;
}

const bootLogs: LogEntry[] = [
  { text: "INITIALIZING NAVEEN_RAJ_CORE V6.0.4...", status: "system", delay: 0 },
  { text: "LOADING NEURAL_RAG_ENGINE... [OK]", status: "success", icon: <Database className="w-3 h-3" />, delay: 400 },
  { text: "BOOTING MULTI_AGENT_ORCHESTRATOR...", status: "system", delay: 800 },
  { text: "CHECKING GPU_ACCELERATION: 4X NVIDIA H100 DETECTED", status: "info", icon: <Zap className="w-3 h-3" />, delay: 1200 },
  { text: "ESTABLISHING SECURE PROTOCOLS...", status: "system", icon: <Lock className="w-3 h-3" />, delay: 1600 },
  { text: "SYSTEM STATUS: OPTIMAL. ACCESS GRANTED.", status: "success", delay: 2000 },
];

const mainLogs: LogEntry[] = [
  { year: "2019", text: "> Booting Web Dev Stack...", status: "success", icon: <Code2 className="w-4 h-4" /> },
  { year: "2019", text: "[INFO] Freelance career initialized. Mastered LAMP stack.", status: "info" },
  { year: "2021", text: "[DEKAP] Scaling B2B e-commerce platforms. Next.js & GraphQL.", status: "info" },
  { year: "2024", text: "[TENANT INC] Senior FE/BE integration. FastAPI & Nuxt.js.", status: "info" },
  { year: "2025", text: "> RECALIBRATING: Focused on Agentic AI & RAG.", status: "warning", icon: <Cpu className="w-4 h-4" /> },
  { year: "2026", text: "[PRESENT] Technical Lead. Orchestrating Multi-Agent Systems.", status: "success", icon: <ShieldCheck className="w-4 h-4" /> },
];

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          onComplete?.();
        }
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(startTimeout);
  }, [text, delay, onComplete]);

  return <span>{displayedText}</span>;
};

export const AgentTerminal = () => {
  const [allVisibleLogs, setAllVisibleLogs] = useState<LogEntry[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const allLogs = [...bootLogs, ...mainLogs];

  useEffect(() => {
    if (currentStep < allLogs.length) {
      const nextLog = allLogs[currentStep];
      // Automatically advance if it's not the first few or adds a small natural delay
      const timer = setTimeout(() => {
        setAllVisibleLogs(prev => [...prev, nextLog]);
        setCurrentStep(prev => prev + 1);
      }, currentStep < bootLogs.length ? 300 : 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allVisibleLogs]);

  return (
    <section id="about" className="py-24 bg-cyber-dark px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(26,27,75,0.3),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden glass shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 terminal-container terminal-glow group"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-cyber-indigo/60 md:bg-cyber-indigo/40 flex items-center justify-between border-b border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20 group-hover:bg-red-500/60 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20 group-hover:bg-yellow-500/60 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20 group-hover:bg-green-500/60 transition-colors" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />
              <span className="text-[10px] md:text-xs font-mono text-cyber-cyan/70 uppercase tracking-[0.2em] font-bold">
                SYSTEM_LOG :: NAVEEN_RAJ_CORE
              </span>
            </div>
            <div className="flex items-center gap-3">
               <Activity className="w-3 h-3 text-cyber-magenta animate-pulse" />
               <TerminalIcon className="w-4 h-4 text-cyber-cyan" />
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            className="p-4 md:p-6 h-[500px] overflow-y-auto font-mono text-xs md:text-sm design-scrollbar bg-[#050510]/80 relative"
          >
            {/* Scanline Overlay */}
            <div className="scanline" />
            
            <div className="space-y-1">
              <AnimatePresence>
                {allVisibleLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row md:gap-4 group/line"
                  >
                    {log.year ? (
                      <span className="text-cyber-cyan font-bold whitespace-nowrap mb-1 md:mb-0">
                        <span className="opacity-40">[</span>
                        {log.year}
                        <span className="opacity-40">]</span>
                      </span>
                    ) : (
                      <span className="text-white/20 whitespace-nowrap mb-1 md:mb-0 hidden md:inline">
                         <span className="opacity-10">[</span>SYS<span className="opacity-10">]</span>
                      </span>
                    )}
                    
                    <div className={`flex items-start gap-3 rounded px-2 transition-colors duration-200 ${
                      log.status === "success" ? "text-green-400 group-hover/line:bg-green-500/5" : 
                      log.status === "warning" ? "text-yellow-400 group-hover/line:bg-yellow-500/5" : 
                      log.status === "error" ? "text-red-400 group-hover/line:bg-red-500/5" :
                      log.status === "system" ? "text-cyber-cyan/90 group-hover/line:bg-cyber-cyan/5" :
                      "text-gray-400 group-hover/line:bg-white/5"
                    }`}>
                      {log.icon && (
                        <span className={`mt-0.5 shrink-0 ${
                          log.status === "success" ? "text-green-500/70" : 
                          log.status === "warning" ? "text-yellow-500/70" : 
                          "text-cyber-cyan/70"
                        }`}>
                          {log.icon}
                        </span>
                      )}
                      
                      <p className="break-words">
                        <TypewriterText text={log.text} />
                        {(index === allVisibleLogs.length - 1) && (
                          <span className="inline-block w-2.5 h-[1.1em] ml-1 bg-cyber-cyan/80 animate-terminal-cursor align-middle" />
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {currentStep === allLogs.length && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4 flex items-center gap-2 text-cyber-cyan/50 text-[10px] font-bold tracking-widest uppercase border-t border-white/5"
                >
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
                  Terminal Instance Active - Monitoring Nodes
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Bar Styling */}
          <div className="px-6 py-2 bg-cyber-indigo/20 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/30">
            <span>MEM: 12.4GB / 128GB</span>
            <span>Uptime: 432:12:05</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
