"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NeuralBackground } from "./NeuralBackground";
import { AiMascot } from "./AiMascot";
import { ChevronDown, Sparkles, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const ROLES = [
  "Technical Lead",
  "Full Stack Developer",
  "AI Engineer",
  "ML Architect",
  "Problem Solver",
];

const TypingRole = () => {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pause"), 1600);
      }
    } else if (phase === "pause") {
      timeoutRef.current = setTimeout(() => setPhase("erasing"), 100);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, 300);
      }
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, phase, roleIndex]);

  return (
    <div className="flex items-center text-lg md:text-xl lg:text-2xl font-bold font-outfit tracking-widest">
      <span className="text-white/60">I Am a&nbsp;</span>
      <span className="text-cyber-cyan drop-shadow-[0_0_12px_rgba(0,243,255,0.5)]">{displayed}</span>
      <span
        className="inline-block w-[3px] h-[0.85em] bg-cyber-cyan rounded-sm ml-1 align-middle animate-terminal-cursor"
      />
    </div>
  );
};

const AnimatedCounter = ({
  target,
  suffix = "",
  label,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white mb-1" style={{ animation: "counter-glow 3s ease-in-out infinite" }}>
        +{count}
        <span className="text-cyber-cyan">{suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-[0.15em]">
        {label}
      </div>
    </div>
  );
};

export const HeroSection = () => {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cyber-dark">
      <NeuralBackground />

      {/* Dual ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyber-magenta/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-indigo/50 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-wide">Technical Lead @ Tenant Inc</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight mb-2 font-outfit leading-[1.05]">
                <span className="text-4xl md:text-6xl text-white block">Hi&nbsp;&nbsp;There,</span>
                <span className="text-white block glitch-text">
                  <span className="text-4xl md:text-6xl">I&apos;m&nbsp;&nbsp;</span><span className="cyber-text-gradient-subtle">Naveen Raj</span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 mb-6"
            >
              <TypingRole />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="#synapse"
                className="group px-7 py-3.5 bg-gradient-to-r from-cyber-cyan to-[#00b8c7] text-cyber-dark font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,243,255,0.35)] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
              >
                View My Projects
                <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-transparent text-white font-bold border border-white/15 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center gap-2 text-sm"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <a href="https://github.com/naveenraj-17" target="_blank" rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/5 transition-all duration-300">
                <GithubIcon className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan transition-colors" />
              </a>
              <a href="https://linkedin.com/in/naveen-raj17" target="_blank" rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-white/10 hover:border-[#7c3aed]/30 hover:bg-[#7c3aed]/5 transition-all duration-300">
                <LinkedinIcon className="w-4 h-4 text-gray-500 group-hover:text-[#7c3aed] transition-colors" />
              </a>
              <a href="mailto:nvenrj@gmail.com"
                className="group p-2.5 rounded-lg border border-white/10 hover:border-cyber-magenta/30 hover:bg-cyber-magenta/5 transition-all duration-300">
                <Mail className="w-4 h-4 text-gray-500 group-hover:text-cyber-magenta transition-colors" />
              </a>
              <div className="h-5 w-px bg-white/10 mx-2" />
              <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                Bengaluru, IN
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t border-white/[0.06]"
            >
              <AnimatedCounter target={6} label="Years Exp." delay={1200} />
              <div className="w-px h-10 bg-white/10" />
              <AnimatedCounter target={10} suffix="+" label="Projects" delay={1400} />
              <div className="w-px h-10 bg-white/10" />
              <AnimatedCounter target={3} label="Companies" delay={1600} />
            </motion.div>
          </div>

          {/* Right - 3D Robot Mascot */}
          <div className="order-1 lg:order-2 flex items-center justify-center relative translate-y-12">
            <AiMascot />

            {/* Floating binary decoration */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-4 text-cyber-cyan/15 font-mono text-xs hidden lg:block"
            >
              01101110<br />01110010
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 left-4 text-cyber-magenta/10 font-mono text-xs hidden lg:block"
            >
              10110010<br />01001101
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
};
