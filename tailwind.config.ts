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
          indigo: "#1a1b4b",
          magenta: "#ff00ff",
          dark: "#0a0a1a",
          "dark-lighter": "#151532",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, #151532 1px, transparent 1px), linear-gradient(to bottom, #151532 1px, transparent 1px)",
      },
      animation: {
        "tilt-n-move-shaking": "tilt-n-move-shaking 0.15s infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
