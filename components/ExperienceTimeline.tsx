"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Tenant Inc.",
    role: "Technical Lead",
    period: "01/2026 - Present",
    location: "Bengaluru, India",
    description:
      "Championing AI innovation, architecting robust RAG pipelines and custom MCP servers using core product APIs. Deploying advanced multi-agent workflows and intelligent chatbots.",
    accentColor: "border-cyber-cyan",
    dotColor: "bg-cyber-cyan",
    dotGlow: "shadow-[0_0_12px_rgba(0,243,255,0.6)]",
    tagColor: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
    current: true,
  },
  {
    company: "Tenant Inc.",
    role: "Senior Software Engineer",
    period: "12/2024 - 01/2026",
    location: "Bengaluru, India",
    description:
      "Developed core full-stack features for self-storage management. Engineered responsive sites using Vue/Nuxt.js with Python (FastAPI) and Node.js (Express) backends.",
    accentColor: "border-violet-500/50",
    dotColor: "bg-violet-500",
    dotGlow: "shadow-[0_0_10px_rgba(124,58,237,0.5)]",
    tagColor: "bg-violet-400/10 text-violet-400 border-violet-400/20",
    current: false,
  },
  {
    company: "DCKAP",
    role: "Senior Product Developer",
    period: "04/2021 - 12/2024",
    location: "Chennai, India",
    description:
      "Directed end-to-end architecture for a specialized B2B e-commerce platform. Led a cross-functional team of 5-10 developers through the entire project lifecycle.",
    accentColor: "border-pink-500/50",
    dotColor: "bg-pink-500",
    dotGlow: "shadow-[0_0_10px_rgba(236,72,153,0.5)]",
    tagColor: "bg-pink-400/10 text-pink-400 border-pink-400/20",
    current: false,
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "03/2019 - 04/2021",
    location: "Remote",
    description:
      "Developed custom web applications using LAMP stack, Laravel, and JQuery for diverse clients, from startups to educational institutions.",
    accentColor: "border-gray-600/50",
    dotColor: "bg-gray-500",
    dotGlow: "",
    tagColor: "bg-gray-400/10 text-gray-400 border-gray-400/20",
    current: false,
  },
];

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-28 bg-cyber-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,243,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-mono text-cyber-cyan/50 tracking-[0.3em] uppercase block mb-3">
            — JOURNEY —
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            CAREER{" "}
            <span className="cyber-text-gradient-subtle">TRAJECTORY</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/30 via-white/10 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-14 md:pl-16 group"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-[11px] md:left-[15px] top-8 w-3.5 h-3.5 rounded-full border-2 border-cyber-dark z-20 transition-all duration-500",
                    exp.dotColor,
                    exp.dotGlow,
                    "group-hover:scale-125"
                  )}
                />

                {/* Connecting horizontal line */}
                <div className="absolute left-[26px] md:left-[30px] top-[37px] w-6 h-px bg-white/[0.06]" />

                {/* Card */}
                <div
                  className={cn(
                    "relative p-7 rounded-2xl bg-cyber-dark-card/50 border border-white/[0.06] backdrop-blur-sm card-hover-lift overflow-hidden",
                    "group-hover:border-white/[0.12]"
                  )}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-cyber-cyan/60" />
                        {exp.role}
                        {exp.current && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 ml-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </h3>
                      <p className="text-sm font-medium flex items-center gap-2 text-gray-400">
                        <Building2 className="w-3.5 h-3.5" />
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 font-mono space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    {exp.description}
                  </p>

                  {/* Left accent border */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b",
                      exp.accentColor === "border-cyber-cyan"
                        ? "from-cyan-400 to-transparent"
                        : exp.accentColor === "border-violet-500/50"
                          ? "from-violet-500 to-transparent"
                          : exp.accentColor === "border-pink-500/50"
                            ? "from-pink-500 to-transparent"
                            : "from-gray-500 to-transparent"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
