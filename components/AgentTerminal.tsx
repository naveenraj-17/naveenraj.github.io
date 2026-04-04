"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  ShieldCheck,
  Cpu,
  Code2,
  Activity,
  Database,
  Zap,
  Lock,
  ChevronRight,
} from "lucide-react";

interface LogEntry {
  text: string;
  status: "success" | "info" | "warning" | "system";
  icon?: React.ReactNode;
  prefix?: string;
}

const bootLogs: LogEntry[] = [
  { text: "INITIALIZING NAVEEN_RAJ_CORE V6.0.4...", status: "system", prefix: "BOOT" },
  { text: "LOADING NEURAL_RAG_ENGINE............... [OK]", status: "success", icon: <Database className="w-3 h-3" />, prefix: "BOOT" },
  { text: "BOOTING MULTI_AGENT_ORCHESTRATOR...", status: "system", prefix: "BOOT" },
  { text: "GPU_ACCEL: 4X NVIDIA H100 DETECTED", status: "info", icon: <Zap className="w-3 h-3" />, prefix: "SYS " },
  { text: "SECURE PROTOCOLS ESTABLISHED", status: "system", icon: <Lock className="w-3 h-3" />, prefix: "AUTH" },
  { text: "SYSTEM OPTIMAL. ACCESS GRANTED.", status: "success", prefix: "CORE" },
];

const careerLogs: LogEntry[] = [
  { text: "> init_career_stack()", status: "system", prefix: "2019" },
  { text: "FREELANCE: Web Dev Stack initialized. LAMP, Laravel, PHP", status: "info", icon: <Code2 className="w-3 h-3" />, prefix: "2019" },
  { text: "DCKAP: B2B e-commerce. Next.js, GraphQL, Node.js", status: "info", icon: <Code2 className="w-3 h-3" />, prefix: "2021" },
  { text: "TENANT: Senior FE/BE. FastAPI, Nuxt.js, Microservices", status: "info", icon: <Cpu className="w-3 h-3" />, prefix: "2024" },
  { text: "> RECALIBRATING: Focus → Agentic AI & RAG Pipelines", status: "warning", icon: <Cpu className="w-3 h-3" />, prefix: "2025" },
  { text: "PRESENT: Technical Lead. Multi-Agent Orchestration.", status: "success", icon: <ShieldCheck className="w-3 h-3" />, prefix: "2026" },
];

const TypewriterText = ({ text, speed = 20 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setDisplayedText(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export const AgentTerminal = () => {
  const [activeTab, setActiveTab] = useState<"system" | "career">("system");
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logs = activeTab === "system" ? bootLogs : careerLogs;

  useEffect(() => {
    setVisibleLogs([]);
    setCurrentStep(0);
  }, [activeTab]);

  useEffect(() => {
    if (currentStep < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, logs[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      }, activeTab === "system" ? 250 : 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep, logs, activeTab]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "system": return "text-cyber-cyan/80";
      default: return "text-gray-400";
    }
  };

  const getPrefixColor = (status: string) => {
    switch (status) {
      case "success": return "text-emerald-500/60";
      case "warning": return "text-amber-500/60";
      case "system": return "text-cyber-cyan/40";
      default: return "text-gray-600";
    }
  };

  return (
    <section id="about" className="py-24 bg-cyber-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,27,75,0.2),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[11px] font-mono text-cyber-cyan/50 tracking-[0.3em] uppercase">
            — SYSTEM LOG —
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/[0.08] terminal-container terminal-glow"
        >
          {/* Header */}
          <div className="px-5 py-3 bg-cyber-dark-card/80 flex items-center justify-between border-b border-white/[0.06] backdrop-blur-xl">
            <div className="flex items-center gap-4">
              {/* Traffic lights */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]/60 border border-[#ff5f57]/30" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]/60 border border-[#febc2e]/30" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]/60 border border-[#28c840]/30" />
              </div>
              <div className="h-4 w-px bg-white/10 hidden md:block" />

              {/* Tabs */}
              <div className="flex items-center gap-1 hidden md:flex">
                <button
                  onClick={() => setActiveTab("system")}
                  className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-200 ${
                    activeTab === "system"
                      ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  system_log
                </button>
                <button
                  onClick={() => setActiveTab("career")}
                  className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-200 ${
                    activeTab === "career"
                      ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  career_log
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-white/30 tracking-widest hidden md:inline">
                NAVEEN_RAJ_CORE
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={scrollRef}
            className="p-5 md:p-6 min-h-[280px] max-h-[380px] overflow-y-auto font-mono text-[13px] leading-relaxed design-scrollbar bg-[#050510]/90 relative"
          >
            <div className="scanline" />

            <div className="space-y-1.5">
              <AnimatePresence>
                {visibleLogs.map((log, index) => (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 group/line py-0.5 rounded px-2 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Line number */}
                    <span className="text-white/15 text-[11px] tabular-nums w-5 text-right flex-shrink-0 select-none pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Prefix */}
                    <span className={`${getPrefixColor(log.status)} text-[11px] w-10 flex-shrink-0 font-bold pt-0.5`}>
                      [{log.prefix}]
                    </span>

                    {/* Icon */}
                    {log.icon && (
                      <span className={`${getStatusColor(log.status)} flex-shrink-0 pt-0.5 opacity-60`}>
                        {log.icon}
                      </span>
                    )}

                    {/* Text */}
                    <span className={`${getStatusColor(log.status)} break-words`}>
                      <TypewriterText text={log.text} speed={15} />
                      {index === visibleLogs.length - 1 && currentStep <= logs.length && (
                        <span className="inline-block w-2 h-[14px] ml-1 bg-cyber-cyan/70 animate-terminal-cursor align-middle" />
                      )}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Completion state */}
              {currentStep >= logs.length && visibleLogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 mt-2 border-t border-white/[0.04]"
                >
                  <div className="flex items-center gap-2 text-gray-600 text-[11px] font-mono">
                    <ChevronRight className="w-3 h-3 text-cyber-cyan/40" />
                    <span className="text-cyber-cyan/30">naveen@core</span>
                    <span className="text-gray-600">~$</span>
                    <span className="w-2 h-[13px] bg-cyber-cyan/50 animate-terminal-cursor" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="px-5 py-2 bg-cyber-dark-card/60 border-t border-white/[0.04] flex justify-between items-center text-[10px] font-mono text-white/20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                CONNECTED
              </span>
              <span>MEM: 12.4GB</span>
            </div>
            <span>UTF-8 | LF</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
