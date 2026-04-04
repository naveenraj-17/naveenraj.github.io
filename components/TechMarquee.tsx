"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechBadge {
  name: string;
  category: string;
  icon: string;
}

const techRow1: TechBadge[] = [
  { name: "JavaScript", category: "LANGUAGE", icon: "JS" },
  { name: "TypeScript", category: "LANGUAGE", icon: "TS" },
  { name: "Python", category: "LANGUAGE", icon: "PY" },
  { name: "React", category: "FRAMEWORK", icon: "⚛" },
  { name: "Next.js", category: "FRAMEWORK", icon: "N" },
  { name: "Vue.js", category: "FRAMEWORK", icon: "V" },
  { name: "Nuxt.js", category: "FRAMEWORK", icon: "NX" },
  { name: "Node.js", category: "RUNTIME", icon: "⬢" },
  { name: "FastAPI", category: "FRAMEWORK", icon: "⚡" },
  { name: "Express", category: "FRAMEWORK", icon: "EX" },
  { name: "GraphQL", category: "API", icon: "◈" },
];

const techRow2: TechBadge[] = [
  { name: "MongoDB", category: "DATABASE", icon: "🍃" },
  { name: "PostgreSQL", category: "DATABASE", icon: "🐘" },
  { name: "DynamoDB", category: "DATABASE", icon: "⚡" },
  { name: "ChromaDB", category: "VECTOR DB", icon: "◉" },
  { name: "Docker", category: "DEVOPS", icon: "🐳" },
  { name: "AWS", category: "CLOUD", icon: "☁" },
  { name: "RAG", category: "AI/ML", icon: "🧠" },
  { name: "LLM", category: "AI/ML", icon: "🤖" },
  { name: "MCP", category: "AI INFRA", icon: "⊛" },
  { name: "Kubernetes", category: "DEVOPS", icon: "☸" },
  { name: "Redis", category: "CACHE", icon: "◆" },
];

const BadgeCard = ({ tech }: { tech: TechBadge }) => (
  <div className="flex-shrink-0 mx-3 group">
    <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-cyber-dark-card/80 border border-white/[0.06] hover:border-cyber-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.08)] backdrop-blur-sm min-w-[180px]">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-magenta/10 flex items-center justify-center text-lg font-bold text-cyber-cyan group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </div>
      <div>
        <p className="text-white font-bold text-sm tracking-wide group-hover:text-cyber-cyan transition-colors duration-300">
          {tech.name}
        </p>
        <p className="text-[10px] text-gray-500 font-mono tracking-[0.15em] uppercase">
          {tech.category}
        </p>
      </div>
    </div>
  </div>
);

export const TechMarquee = () => {
  return (
    <section className="py-20 bg-cyber-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[11px] font-mono text-cyber-cyan/60 tracking-[0.3em] uppercase block mb-3">
            — INVENTORY —
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            The Tech{" "}
            <span className="cyber-text-gradient-subtle">Stack</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 - scrolls left */}
      <div className="relative mb-5">
        <div className="flex animate-marquee-left marquee-track">
          {[...techRow1, ...techRow1].map((tech, i) => (
            <BadgeCard key={`r1-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="relative">
        <div className="flex animate-marquee-right marquee-track">
          {[...techRow2, ...techRow2].map((tech, i) => (
            <BadgeCard key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-cyber-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
};
