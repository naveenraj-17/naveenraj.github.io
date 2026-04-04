import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: "#00f3ff",
          "cyan-dim": "#00a8b3",
          indigo: "#1a1b4b",
          magenta: "#ff00ff",
          purple: "#7c3aed",
          dark: "#0a0a1a",
          "dark-lighter": "#151532",
          "dark-card": "#0d0d24",
          accent: "#00f3ff",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid":
          "linear-gradient(to right, #151532 1px, transparent 1px), linear-gradient(to bottom, #151532 1px, transparent 1px)",
      },
      animation: {
        "tilt-n-move-shaking": "tilt-n-move-shaking 0.15s infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        glitch: "glitch 2s infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        "gradient-shift": "gradient-shift 6s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "bounce-gentle": "bounce-gentle 3s ease-in-out infinite",
        "data-flow": "data-flow 2s linear infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "tilt-n-move-shaking": {
          "0%, 100%": { transform: "rotate(0deg) translate(0, 0)" },
          "25%": { transform: "rotate(0.5deg) translate(2px, -1px)" },
          "50%": { transform: "rotate(0deg) translate(-1px, 1px)" },
          "75%": { transform: "rotate(-0.5deg) translate(-2px, -1px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1) blur(0px)" },
          "50%": { opacity: "0.8", filter: "brightness(1.5) blur(2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 243, 255, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 243, 255, 0.3)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(100px) rotate(-360deg)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "data-flow": {
          "0%": { strokeDashoffset: "20" },
          "100%": { strokeDashoffset: "0" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 243, 255, 0.2)" },
          "50%": { borderColor: "rgba(0, 243, 255, 0.6)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
export default config;
