"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Rocket, Shield, Database, Code2 } from "lucide-react";

const skills = [
  {
    category: "AI & ORCHESTRATION",
    icon: <Cpu />,
    items: ["RAG Pipelines", "Multi-Agent DAGs", "MCP Servers", "LLM Integration (Ollama, GPT-4)"],
    color: "shadow-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400"
  },
  {
    category: "FULL STACK JS",
    icon: <Globe />,
    items: ["React & Next.js", "Vue & Nuxt.js", "Node.js (Express/Fastify)", "TypeScript"],
    color: "shadow-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400"
  },
  {
    category: "BACKEND & SCALING",
    icon: <Rocket />,
    items: ["Python (FastAPI)", "Microservices", "Docker & Kubernetes", "AWS CI/CD"],
    color: "shadow-magenta-500/10 border-magenta-500/20",
    iconColor: "text-magenta-400"
  },
  {
    category: "DATABASES & VECTOR",
    icon: <Database />,
    items: ["MongoDB", "PostgreSQL", "ChromaDB", "Vector DB (Pinecone/Milvus)"],
    color: "shadow-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400"
  }
];

export const SkillsBento = () => {
  return (
    <section id="skills" className="py-24 bg-cyber-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
            <h2 className="text-4xl font-black text-white mb-4">EXPERTISE <span className="text-cyber-cyan">STACK</span></h2>
            <p className="text-gray-500">6 Years of building, scaling, and orchestrating intelligent systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card p-8 rounded-3xl border-2 ${skill.color} relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                {React.cloneElement(skill.icon as React.ReactElement, { size: 100 })}
              </div>
              
              <div className={`${skill.iconColor} mb-6`}>
                {React.cloneElement(skill.icon as React.ReactElement, { size: 40 })}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-tighter">
                {skill.category}
              </h3>
              
              <ul className="space-y-4">
                {skill.items.map((item, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan opacity-40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
