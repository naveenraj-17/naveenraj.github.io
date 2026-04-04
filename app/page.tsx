"use client";

import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AgentTerminal } from "@/components/AgentTerminal";
import { SynapseSpotlight } from "@/components/SynapseSpotlight";
import { TechMarquee } from "@/components/TechMarquee";
import { SkillsBento } from "@/components/SkillsBento";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyber-dark antialiased">
      <NavBar />
      <HeroSection />

      <div className="relative">
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />

        <AgentTerminal />

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <SynapseSpotlight />

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <TechMarquee />

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <SkillsBento />

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <ExperienceTimeline />

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
