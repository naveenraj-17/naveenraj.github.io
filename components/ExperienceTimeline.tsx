"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Tenant Inc.",
    role: "Technical Lead",
    period: "01/2026 - Present",
    location: "Bengaluru, India",
    description: "Championing AI innovation, architecting robust RAG pipelines and custom MCP servers using core product APIs. Deploying advanced multi-agent workflows and intelligent chatbots.",
    color: "border-cyber-cyan",
  },
  {
    company: "Tenant Inc.",
    role: "Senior Software Engineer",
    period: "12/2024 - 01/2026",
    location: "Bengaluru, India",
    description: "Developed core full-stack features for self-storage management. Engineered responsive sites using Vue/Nuxt.js with Python (FastAPI) and Node.js (Express) backends.",
    color: "border-cyber-indigo",
  },
  {
    company: "DCKAP",
    role: "Senior Product Developer",
    period: "04/2021 - 12/2024",
    location: "Chennai, India",
    description: "Directed end-to-end architecture for a specialized B2B e-commerce platform. Led a cross-functional team of 5-10 developers through the entire project lifecycle.",
    color: "border-cyber-magenta",
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "03/2019 - 04/2021",
    location: "Remote",
    description: "Developed custom web applications using LAMP stack, Laravel, and JQuery for diverse clients, from startups to educational institutions.",
    color: "border-gray-500",
  },
];

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 bg-cyber-dark px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-center mb-16 text-white"
        >
          CAREER <span className="text-cyber-cyan">TRAJECTORY</span>
        </motion.h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-12">
            {experiences.map((exp, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-10"
                >
                    {/* Timeline Dot */}
                    <div className={cn(
                        "absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-cyber-dark border-2 border-primary z-20",
                        exp.color === "border-cyber-cyan" ? "border-cyber-cyan shadow-[0_0_10px_#00f3ff]" : 
                        exp.color === "border-cyber-magenta" ? "border-cyber-magenta shadow-[0_0_10px_#ff00ff]" :
                        "border-white/20"
                    )} />

                    <div className={cn(
                        "glass-card p-8 rounded-2xl border-l-4",
                        exp.color
                    )}>
                        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-cyber-cyan" />
                                    {exp.role}
                                </h3>
                                <p className="text-cyber-cyan font-medium flex items-center gap-2 mt-1">
                                    <Building2 className="w-4 h-4" />
                                    {exp.company}
                                </p>
                            </div>
                            <div className="text-sm text-gray-400 font-mono space-y-1">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {exp.period}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {exp.location}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            {exp.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
