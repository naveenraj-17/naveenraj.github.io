"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Star,
  GitBranch,
  Cpu,
  BarChart3,
  Merge,
  Zap,
  Shield,
  Eye,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── DAG Node Types ─── */
interface DagNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  col: number; // 0-based column index (0..5)
  row: number; // 0=top, 1=middle, 2=bottom
  type: "start" | "router" | "agent" | "human" | "merge" | "output";
}

interface DagEdge {
  from: string;
  to: string;
}

/*
 * Column map (6 cols):  0=input  1=router  2=agents  3=human/reviewer/writer  4=merge  5=output
 * Row map  (3 rows):    0=top    1=middle  2=bottom
 *
 *  Col:  0        1         2           3         4       5
 *  Row0: —        —       Researcher  Reviewer   —       —
 *  Row1: Input  Router    Analyst      Human    Merge  Delivery
 *  Row2: —        —       Code Gen    Writer    —       —
 */
const COL_COUNT = 6;
const ROW_COUNT = 3;

const dagNodes: DagNode[] = [
  {
    id: "input",
    label: "User Query",
    sublabel: "START",
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "from-cyan-400 to-cyan-600",
    glowColor: "rgba(0,243,255,0.45)",
    col: 0, row: 1, type: "start",
  },
  {
    id: "router",
    label: "Task Router",
    sublabel: "EVALUATION",
    icon: <GitBranch className="w-3.5 h-3.5" />,
    color: "from-violet-500 to-purple-600",
    glowColor: "rgba(124,58,237,0.45)",
    col: 1, row: 1, type: "router",
  },
  {
    id: "researcher",
    label: "Researcher",
    sublabel: "AGENT",
    icon: <Search className="w-3.5 h-3.5" />,
    color: "from-blue-500 to-blue-600",
    glowColor: "rgba(59,130,246,0.4)",
    col: 2, row: 0, type: "agent",
  },
  {
    id: "analyst",
    label: "Analyst",
    sublabel: "AGENT",
    icon: <BarChart3 className="w-3.5 h-3.5" />,
    color: "from-emerald-500 to-green-600",
    glowColor: "rgba(16,185,129,0.4)",
    col: 2, row: 1, type: "agent",
  },
  {
    id: "coder",
    label: "Code Gen",
    sublabel: "AGENT",
    icon: <Cpu className="w-3.5 h-3.5" />,
    color: "from-orange-500 to-amber-600",
    glowColor: "rgba(245,158,11,0.4)",
    col: 2, row: 2, type: "agent",
  },
  {
    id: "reviewer",
    label: "Reviewer",
    sublabel: "AGENT",
    icon: <Eye className="w-3.5 h-3.5" />,
    color: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.3)",
    col: 3, row: 0, type: "agent",
  },
  {
    id: "human",
    label: "Human",
    sublabel: "APPROVAL",
    icon: <UserCheck className="w-3.5 h-3.5" />,
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(251,191,36,0.5)",
    col: 3, row: 1, type: "human",
  },
  {
    id: "writer",
    label: "Writer",
    sublabel: "AGENT",
    icon: <PenTool className="w-3.5 h-3.5" />,
    color: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.3)",
    col: 3, row: 2, type: "agent",
  },
  {
    id: "merge",
    label: "Merge",
    sublabel: "COLLECT",
    icon: <Merge className="w-3.5 h-3.5" />,
    color: "from-teal-500 to-cyan-600",
    glowColor: "rgba(20,184,166,0.4)",
    col: 4, row: 1, type: "merge",
  },
  {
    id: "output",
    label: "Delivery",
    sublabel: "OUTPUT",
    icon: <Shield className="w-3.5 h-3.5" />,
    color: "from-green-500 to-emerald-600",
    glowColor: "rgba(34,197,94,0.4)",
    col: 5, row: 1, type: "output",
  },
];

const dagEdges: DagEdge[] = [
  { from: "input", to: "router" },
  { from: "router", to: "researcher" },
  { from: "router", to: "analyst" },
  { from: "router", to: "coder" },
  { from: "researcher", to: "reviewer" },
  { from: "analyst", to: "human" },
  { from: "coder", to: "writer" },
  { from: "reviewer", to: "merge" },
  { from: "human", to: "merge" },
  { from: "writer", to: "merge" },
  { from: "merge", to: "output" },
];

/* ─── Flow paths ─── */
const flowPaths = [
  ["input", "router", "researcher", "reviewer", "merge", "output"],
  ["input", "router", "analyst", "human", "merge", "output"],
  ["input", "router", "coder", "writer", "merge", "output"],
];

/* ─── Convert col/row to pixel position (centered grid) ─── */
const getNodePx = (
  node: DagNode,
  W: number,
  H: number
): { x: number; y: number } => {
  const colPad = 0.07;
  const rowPad = 0.08;
  const colStep = (1 - colPad * 2) / (COL_COUNT - 1);
  const rowStep = (1 - rowPad * 2) / (ROW_COUNT - 1);
  return {
    x: Math.round((colPad + node.col * colStep) * W),
    y: Math.round((rowPad + node.row * rowStep) * H),
  };
};

/* ─── DAG Node Component ─── */
const DagNodeComponent = ({
  node,
  isActive,
  isPast,
  W,
  H,
}: {
  node: DagNode;
  isActive: boolean;
  isPast: boolean;
  W: number;
  H: number;
}) => {
  const { x, y } = getNodePx(node, W, H);
  const isHuman = node.type === "human";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: node.col * 0.08 + node.row * 0.04, duration: 0.4, type: "spring" }}
      className="absolute"
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{
          boxShadow: isActive
            ? `0 0 20px ${node.glowColor}, 0 0 40px ${node.glowColor}`
            : isPast
              ? `0 0 8px ${node.glowColor}`
              : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border backdrop-blur-sm transition-all duration-500",
          isActive
            ? "border-white/20 bg-white/[0.08] scale-110"
            : isPast
              ? "border-white/10 bg-white/[0.04] opacity-80"
              : "border-white/[0.06] bg-white/[0.02] opacity-50",
          isHuman && isActive && "border-yellow-400/40"
        )}
      >
        {/* Type label */}
        <span
          className={cn(
            "text-[7px] font-mono tracking-[0.15em] uppercase absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0 rounded-full whitespace-nowrap",
            isActive
              ? isHuman
                ? "text-yellow-400/90 bg-cyber-dark"
                : "text-cyber-cyan/90 bg-cyber-dark"
              : "text-gray-600 bg-cyber-dark"
          )}
        >
          {node.sublabel}
        </span>

        {/* Icon */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br transition-all duration-500",
            node.color,
            isActive && "ring-1 ring-white/20"
          )}
        >
          <div className="text-white">{node.icon}</div>
        </div>

        {/* Label */}
        <span
          className={cn(
            "text-[9px] font-bold tracking-wide whitespace-nowrap transition-colors duration-300",
            isActive ? "text-white" : "text-gray-500"
          )}
        >
          {node.label}
        </span>

        {/* Active pulse dot */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: isHuman ? "#fbbf24" : "#00f3ff",
              boxShadow: isHuman
                ? "0 0 6px rgba(251,191,36,0.9)"
                : "0 0 6px rgba(0,243,255,0.8)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── SVG Edge Lines ─── */
const DagEdges = ({
  activeNodes,
  W,
  H,
}: {
  activeNodes: Set<string>;
  W: number;
  H: number;
}) => {
  const getPos = useCallback(
    (id: string) => {
      const node = dagNodes.find((n) => n.id === id);
      if (!node) return { x: 0, y: 0 };
      return getNodePx(node, W, H);
    },
    [W, H]
  );

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={W}
      height={H}
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="edgeGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="edgeGradHuman" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="edgeGradInactive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
        <filter id="edgeGlow">
          <feGaussianBlur stdDeviation="2.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {dagEdges.map((edge) => {
        const from = getPos(edge.from);
        const to = getPos(edge.to);
        const isEdgeActive = activeNodes.has(edge.from) && activeNodes.has(edge.to);

        // Detect if this edge involves the human node
        const involvesHuman =
          (edge.from === "human" || edge.to === "human" ||
            edge.from === "analyst" || edge.to === "analyst") &&
          activeNodes.has("human");

        // Cubic bezier: horizontal control points hug the source/target y
        const dx = to.x - from.x;
        const cp1x = from.x + dx * 0.45;
        const cp1y = from.y;
        const cp2x = from.x + dx * 0.55;
        const cp2y = to.y;
        const path = `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;

        const stroke = isEdgeActive
          ? involvesHuman
            ? "url(#edgeGradHuman)"
            : "url(#edgeGradActive)"
          : "url(#edgeGradInactive)";

        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path
              d={path}
              fill="none"
              stroke={stroke}
              strokeWidth={isEdgeActive ? 2 : 1}
              filter={isEdgeActive ? "url(#edgeGlow)" : undefined}
              strokeDasharray={isEdgeActive ? undefined : "4 6"}
            />
            {isEdgeActive && (
              <circle
                r="3.5"
                fill={involvesHuman ? "#fbbf24" : "#00f3ff"}
                filter="url(#edgeGlow)"
              >
                <animateMotion dur="1.6s" repeatCount="indefinite" path={path} />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Main Synapse Section ─── */
export const SynapseSpotlight = () => {
  const [activePathIdx, setActivePathIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 300 });

  const currentPath = flowPaths[activePathIdx];
  const activeNodes = new Set(currentPath.slice(0, activeStepIdx + 1));
  const activeNodeId = currentPath[activeStepIdx];

  /* Measure container for accurate SVG sizing */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    // Initial measure
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width > 0) setDims({ w: rect.width, h: rect.height });
    return () => ro.disconnect();
  }, []);

  /* Step animation */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIdx((prev) => {
        if (prev >= currentPath.length - 1) {
          setActivePathIdx((pi) => (pi + 1) % flowPaths.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [currentPath.length]);

  return (
    <section id="synapse" className="py-28 bg-cyber-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(124,58,237,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="text-[11px] font-mono text-cyber-cyan/50 tracking-[0.3em] uppercase block mb-4">
                — FLAGSHIP PROJECT —
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 text-white"
            >
              SYNAPSE{" "}
              <span className="cyber-text-gradient-subtle">AI</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              A privacy-first, local AI agent orchestration platform that
              converts complex requirements into automated workflows using
              DAG-based multi-agent pipelines.
            </motion.p>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["Python", "MCP", "Ollama", "DAG", "Orchestrator"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg text-gray-400 tracking-wider"
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>

            <ul className="space-y-4 mb-10">
              {[
                "Local-first: Runs on Ollama / Llama.cpp",
                "Multi-Agent DAG Orchestration",
                "Built-in Tool Vault & MCP Servers",
                "Human-in-the-loop Checkpoints",
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <a
                href="https://github.com/naveenraj-17/synapse-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 hover:border-cyber-cyan/30 transition-all duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Repository
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Star className="w-4 h-4 text-yellow-500/60" />
                <span className="font-mono">Open Source</span>
              </div>
            </motion.div>
          </div>

          {/* Right - DAG Graph Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-6 md:p-8 rounded-3xl bg-cyber-dark-card/50 border border-white/[0.06] backdrop-blur-sm overflow-hidden">
              {/* Dot grid background */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* DAG Container — measured via ref for pixel-perfect SVG */}
              <div
                ref={containerRef}
                className="relative z-10"
                style={{ height: "300px" }}
              >
                <DagEdges activeNodes={activeNodes} W={dims.w} H={dims.h} />
                {dagNodes.map((node) => (
                  <DagNodeComponent
                    key={node.id}
                    node={node}
                    isActive={activeNodeId === node.id}
                    isPast={activeNodes.has(node.id) && activeNodeId !== node.id}
                    W={dims.w}
                    H={dims.h}
                  />
                ))}
              </div>

              {/* Status bar */}
              <motion.div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-[9px] font-mono text-emerald-400/60 tracking-[0.15em]">
                    PIPELINE ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-gray-600 tracking-wider">
                    PATH {activePathIdx + 1}/{flowPaths.length}
                  </span>
                  <span className="text-[9px] font-mono text-cyber-cyan/40 tracking-wider">
                    STEP {activeStepIdx + 1}/{currentPath.length}
                  </span>
                </div>
              </motion.div>

              {/* Background pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-48 h-48 bg-cyber-cyan/10 rounded-full blur-[60px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
