"use client";

import React from "react";
import { Mail, ChevronUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { motion } from "framer-motion";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-cyber-dark border-t border-white/[0.04] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Branding */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-lg font-bold tracking-tighter text-white font-outfit">
              NAVEEN<span className="text-cyber-cyan">RAJ</span>
            </span>
            <span className="text-gray-600 text-sm font-mono">•</span>
            <span className="text-gray-600 text-xs font-mono tracking-widest uppercase">
              Tech Lead & AI Expert
            </span>
          </div>

          {/* Center - Social */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/naveenraj-17"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-lg border border-white/[0.06] hover:border-cyber-cyan/30 hover:bg-cyber-cyan/5 transition-all duration-300"
            >
              <GithubIcon className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/naveen-raj17"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-lg border border-white/[0.06] hover:border-[#7c3aed]/30 hover:bg-[#7c3aed]/5 transition-all duration-300"
            >
              <LinkedinIcon className="w-4 h-4 text-gray-500 group-hover:text-[#7c3aed] transition-colors" />
            </a>
            <a
              href="mailto:nvenrj@gmail.com"
              className="group p-2.5 rounded-lg border border-white/[0.06] hover:border-cyber-magenta/30 hover:bg-cyber-magenta/5 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-gray-500 group-hover:text-cyber-magenta transition-colors" />
            </a>
          </div>

          {/* Right - Back to top */}
          <div className="flex-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.06] hover:border-cyber-cyan/20 text-gray-500 hover:text-cyber-cyan transition-all duration-300 text-xs font-mono tracking-wider"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              TOP
            </motion.button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-gray-600 text-xs font-mono tracking-wider text-center">
            © {new Date().getFullYear()} NAVEEN RAJ — Built with{" "}
            <Heart className="w-3 h-3 text-cyber-magenta/50 inline-block align-middle mx-0.5" />{" "}
            and lots of caffeine
          </p>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-cyber-cyan/[0.03] rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};
