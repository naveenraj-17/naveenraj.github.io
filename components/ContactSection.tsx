"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Send, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-28 bg-cyber-dark relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,243,255,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-mono text-cyber-cyan/60 tracking-[0.3em] uppercase block mb-3">
            — LET&apos;S CONNECT —
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Got a Project in{" "}
            <span className="cyber-text-gradient-subtle">Mind?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of something amazing. Let&apos;s build the future together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="mailto:nvenrj@gmail.com"
            className="group relative px-10 py-5 bg-gradient-to-r from-cyber-cyan to-[#00b8c7] text-cyber-dark font-bold rounded-xl hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-all duration-500 flex items-center gap-3 text-lg"
          >
            <Mail className="w-5 h-5" />
            Say Hello
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/Naveen Resume.pdf"
              download
              className="group px-5 py-4 rounded-xl glass-card-static hover:border-emerald-400/40 transition-all duration-300 flex items-center gap-2.5"
            >
              <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-sm font-semibold text-gray-400 group-hover:text-emerald-400 transition-colors">
                Resume
              </span>
            </a>
            <a
              href="https://github.com/naveenraj-17"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl glass-card-static hover:border-cyber-cyan/40 transition-all duration-300"
            >
              <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-cyber-cyan transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/naveen-raj17"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl glass-card-static hover:border-[#7c3aed]/40 transition-all duration-300"
            >
              <LinkedinIcon className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 text-gray-600 text-xs font-mono tracking-widest">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700" />
            BASED IN BENGALURU, INDIA
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
