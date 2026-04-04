"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NeuralBackground } from "./NeuralBackground";
import { ChevronDown, Sparkles, Binary, Cpu } from "lucide-react";

export const HeroSection = () => {
  const mouseX = useSpring(useMotionValue(0), { damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark group cursor-none">
      <NeuralBackground />

      {/* Custom Mouse Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at calc(50% + ${mouseX.get()}px * 10) calc(50% + ${mouseY.get()}px * 10), rgba(0, 243, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-indigo/50 border border-cyber-cyan/30 text-cyber-cyan text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Technical Lead @ Tenant Inc</span>
        </motion.div>

        <motion.div
          style={{ x: mouseX, y: mouseY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 font-outfit"
          >
            <span className="text-white block">REDEFINING</span>
            <span className="cyber-text-gradient block relative">
              AI ORCHESTRATION
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building highly-scalable, multi-agent systems and intelligent RAG architectures.
          6 years of expertise in turning code into autonomous value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <button className="px-8 py-4 bg-cyber-cyan text-cyber-dark font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
            View My Projects
          </button>
          <button className="px-8 py-4 bg-transparent text-white font-bold border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
            Get In Touch
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>

      {/* Floating Icons for Background Interest - Responsive to mouse */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-1/4 right-[10%] opacity-20 hidden lg:block"
      >
        <Binary className="w-24 h-24 text-cyber-cyan" />
        <span className="absolute -bottom-4 left-0 text-[10px] font-mono text-cyber-cyan font-bold opacity-50 uppercase tracking-widest">0110_CORE</span>
      </motion.div>

      <motion.div
        style={{
          x: useSpring(useMotionValue(0), { damping: 12 }),
          y: useSpring(useMotionValue(0), { damping: 12 })
        }}
        className="absolute bottom-1/4 left-[10%] opacity-20 hidden lg:block"
        onMouseMove={(e) => {
          // Internal React mouse movement for this specific div for extra "floaty" feel
        }}
      >
        <motion.div style={{ x: mouseX, y: mouseY }}>
          <Cpu className="w-24 h-24 text-cyber-magenta" />
          <span className="absolute -bottom-4 left-0 text-[10px] font-mono text-cyber-magenta font-bold opacity-50 uppercase tracking-widest">CHIP_INIT</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
