"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Database, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  { id: "researcher", icon: <Search />, label: "Researcher", color: "from-blue-500 to-cyan-500" },
  { id: "analyst", icon: <Database />, label: "Analyst", color: "from-purple-500 to-indigo-500" },
  { id: "writer", icon: <PenTool />, label: "Writer", color: "from-pink-500 to-rose-500" },
  { id: "delivery", icon: <Mail />, label: "Delivery", color: "from-green-500 to-emerald-500" },
];

export const SynapseSpotlight = () => {
  return (
    <section id="synapse" className="py-24 bg-cyber-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 text-white"
            >
              SYNAPSE <span className="text-cyber-cyan">AI</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              My signature open-source project. A privacy-first, local AI agent orchestration platform 
              that converts complex requirements into automated workflows.
            </motion.p>
            <ul className="space-y-4 mb-8">
              {[
                "Local-first: Runs on Ollama/Llama.cpp",
                "Multi-Agent DAG Orchestration",
                "Built-in Tool Vault & MCP Servers",
                "Human-in-the-loop Checkpoints"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <CheckCircle className="w-5 h-5 text-cyber-cyan" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="https://github.com/naveenraj-17/synapse-ai"
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 text-cyber-cyan font-bold hover:gap-4 transition-all"
            >
              Explore the Repository <ArrowRight />
            </motion.a>
          </div>

          {/* Graphical Visualizer */}
          <div className="relative p-12 glass-card rounded-3xl min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-cyber-grid opacity-10" />
            
            <div className="grid grid-cols-2 gap-12 relative z-10 w-full max-w-sm">
                {agents.map((agent, i) => (
                    <motion.div
                        key={agent.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative group"
                    >
                        <div className={cn(
                            "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 group-hover:shadow-cyan-500/20 transition-all duration-300",
                            agent.color
                        )}>
                            <div className="text-white w-8 h-8">
                                {agent.icon}
                            </div>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500 tracking-widest">{agent.label}</span>
                        
                        {/* Animated Connections */}
                        {i === 0 && (
                            <motion.div 
                              className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 origin-left"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        )}
                        {i === 1 && (
                            <motion.div 
                              className="absolute left-1/2 -bottom-16 w-0.5 h-16 bg-gradient-to-b from-indigo-500 to-rose-500 origin-top"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              transition={{ delay: 0.8, duration: 0.8 }}
                            />
                        )}
                        {i === 2 && (
                             <motion.div 
                               className="absolute top-1/2 -left-12 w-12 h-0.5 bg-gradient-to-l from-rose-500 to-emerald-500 origin-right"
                               initial={{ scaleX: 0 }}
                               whileInView={{ scaleX: 1 }}
                               transition={{ delay: 1.1, duration: 0.8 }}
                             />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Pulse Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
