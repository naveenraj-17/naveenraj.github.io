"use client";

import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AgentTerminal } from "@/components/AgentTerminal";
import { SynapseSpotlight } from "@/components/SynapseSpotlight";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsBento } from "@/components/SkillsBento";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyber-dark antialiased">
      <NavBar />
      <HeroSection />
      
      <div className="relative">
          {/* Subtle separator glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
          
          <AgentTerminal />
          <SynapseSpotlight />
          <SkillsBento />
          <ExperienceTimeline />
      </div>

      <Footer />
    </main>
  );
}
