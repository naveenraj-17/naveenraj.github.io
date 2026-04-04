"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Rocket, Database, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  {
    category: "AI & Orchestration",
    icon: <Cpu />,
    items: ["RAG Pipelines", "Multi-Agent DAGs", "MCP Servers", "LLM Integration (Ollama, GPT-4)"],
    proficiency: 90,
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(0, 243, 255, 0.15)",
    borderColor: "hover:border-cyan-400/40",
    iconBg: "bg-cyan-400/10",
    iconColor: "text-cyan-400",
    ringColor: "#00f3ff",
  },
  {
    category: "Full Stack JS",
    icon: <Globe />,
    items: ["React & Next.js", "Vue & Nuxt.js", "Node.js (Express/Fastify)", "TypeScript"],
    proficiency: 95,
    color: "from-violet-400 to-indigo-500",
    glowColor: "rgba(124, 58, 237, 0.15)",
    borderColor: "hover:border-violet-400/40",
    iconBg: "bg-violet-400/10",
    iconColor: "text-violet-400",
    ringColor: "#7c3aed",
  },
  {
    category: "Backend & Scaling",
    icon: <Rocket />,
    items: ["Python (FastAPI)", "Microservices", "Docker & Kubernetes", "AWS CI/CD"],
    proficiency: 85,
    color: "from-pink-400 to-rose-500",
    glowColor: "rgba(255, 0, 255, 0.1)",
    borderColor: "hover:border-pink-400/40",
    iconBg: "bg-pink-400/10",
    iconColor: "text-pink-400",
    ringColor: "#ec4899",
  },
  {
    category: "Databases & Vector",
    icon: <Database />,
    items: ["MongoDB", "PostgreSQL", "ChromaDB", "Vector DB (Pinecone)"],
    proficiency: 88,
    color: "from-blue-400 to-sky-500",
    glowColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "hover:border-blue-400/40",
    iconBg: "bg-blue-400/10",
    iconColor: "text-blue-400",
    ringColor: "#38bdf8",
  },
];

const ProgressRing = ({
  percent,
  color,
  size = 60,
}: {
  percent: number;
  color: string;
  size?: number;
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
};

export const SkillsBento = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="py-28 bg-cyber-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,243,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-mono text-cyber-cyan/50 tracking-[0.3em] uppercase block mb-3">
            — CAPABILITIES —
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            EXPERTISE{" "}
            <span className="cyber-text-gradient-subtle">STACK</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            6 Years of building, scaling, and orchestrating intelligent systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "group relative p-7 rounded-2xl border border-white/[0.06] bg-cyber-dark-card/50 backdrop-blur-sm card-hover-lift cursor-default overflow-hidden",
                skill.borderColor
              )}
              style={{
                boxShadow: hoveredIdx === i ? `0 20px 50px ${skill.glowColor}` : "none",
                transition: "box-shadow 0.5s ease",
              }}
            >
              {/* Background icon watermark */}
              <div className="absolute -top-4 -right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                {React.cloneElement(skill.icon as React.ReactElement, { size: 120 })}
              </div>

              {/* Header: icon + progress ring */}
              <div className="flex items-center justify-between mb-6">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", skill.iconBg)}>
                  <div className={skill.iconColor}>
                    {React.cloneElement(skill.icon as React.ReactElement, { size: 22 })}
                  </div>
                </div>
                <div className="relative">
                  <ProgressRing percent={skill.proficiency} color={skill.ringColor} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white/70">{skill.proficiency}%</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-5 tracking-tight">
                {skill.category}
              </h3>

              {/* Sub-skills */}
              <ul className="space-y-3">
                {skill.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.08 }}
                    className="text-gray-400 text-sm flex items-center gap-2.5 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    <ChevronRight className={cn("w-3 h-3 flex-shrink-0 opacity-40 group-hover:opacity-80 transition-opacity", skill.iconColor)} />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Bottom gradient line */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  skill.color
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
