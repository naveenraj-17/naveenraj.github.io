"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Mail, Menu, X, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Synapse AI", href: "#synapse" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled
          ? "py-3 bg-cyber-dark/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-cyber-indigo/80 group-hover:bg-cyber-cyan/20 border border-white/[0.06] group-hover:border-cyber-cyan/30 transition-all duration-300">
            <Terminal className="w-5 h-5 text-cyber-cyan" />
          </div>
          <span className="text-lg font-bold tracking-tighter text-white font-outfit">
            NAVEEN<span className="text-cyber-cyan">RAJ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 border-l border-white/[0.06] pl-6 ml-4">
            <a
              href="/Naveen Resume.pdf"
              download
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] text-gray-500 hover:text-emerald-400 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wide">Resume</span>
            </a>
            <a
              href="https://github.com/naveenraj-17"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/[0.04] text-gray-500 hover:text-cyber-cyan transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/naveen-raj17"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/[0.04] text-gray-500 hover:text-[#7c3aed] transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/[0.04]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-cyber-dark/95 backdrop-blur-xl border-b border-white/[0.06] p-6 md:hidden flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/[0.04] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-4 mt-2 border-t border-white/[0.06]">
              <a href="/Naveen Resume.pdf" download className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-400 transition-colors">
                <Download className="w-5 h-5" />
                <span className="text-sm font-semibold">Resume</span>
              </a>
              <a href="https://github.com/naveenraj-17" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyber-cyan">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/naveen-raj17" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7c3aed]">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="mailto:nvenrj@gmail.com" className="text-gray-500 hover:text-cyber-magenta">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
