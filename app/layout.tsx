import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Naveen Raj | Technical Lead & AI Orchestration Engineer",
  description: "Portfolio of Naveen Raj, a Technical Lead specializing in AI Agent Orchestration, RAG pipelines, and high-scale Full Stack development.",
  keywords: ["Naveen Raj", "AI Agent", "Orchestration Engineer", "Technical Lead", "Synapse AI", "RAG", "MCP", "Full Stack Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
        {children}
      </body>
    </html>
  );
}
