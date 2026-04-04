"use client";

import React from "react";
import { Globe, Code2, Mail, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-cyber-dark border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <motion.div
           whileHover={{ scale: 1.1 }}
           onClick={scrollToTop}
           className="w-12 h-12 bg-cyber-indigo rounded-full flex items-center justify-center cursor-pointer mb-8 group"
        >
          <ChevronUp className="w-6 h-6 text-cyber-cyan group-hover:text-white transition-colors" />
        </motion.div>

        <div className="flex gap-8 mb-8 text-gray-500">
          <a href="https://github.com/naveenraj-17" target="_blank" className="hover:text-cyber-cyan transition-colors">
            <Code2 className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/naveen-raj17" target="_blank" className="hover:text-cyber-cyan transition-colors">
            <Globe className="w-6 h-6" />
          </a>
          <a href="mailto:nvenrj@gmail.com" className="hover:text-cyber-cyan transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <p className="text-gray-600 text-sm tracking-widest font-mono">
          © 2026 NAVEEN RAJ // <span className="text-cyber-cyan/50">TECH LEAD & AI EXPERT</span>
        </p>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};
