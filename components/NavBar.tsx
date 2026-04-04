"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Code2, Link as LinkIcon, Mail, Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Synapse AI", href: "#synapse" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-cyber-dark/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-cyber-indigo group-hover:bg-cyber-cyan transition-colors duration-300">
            <Terminal className="w-6 h-6 text-cyber-cyan group-hover:text-cyber-dark" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white font-outfit">
            NAVEEN<span className="text-cyber-cyan">RAJ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-white/10 pl-8 ml-4">
            <a href="https://github.com/naveenraj-17" target="_blank" className="hover:text-cyber-cyan transition-colors">
              <Code2 className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/naveen-raj17" target="_blank" className="hover:text-cyber-cyan transition-colors">
              <LinkIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-cyber-dark/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-6 pt-4 border-t border-white/10">
              <Code2 className="w-6 h-6" />
              <LinkIcon className="w-6 h-6" />
              <Mail className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
