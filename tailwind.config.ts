import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#050914", 900: "#0a1226", 800: "#111c3a", 700: "#1a2a55" },
        cobalt: { DEFAULT: "#2a5bff", 300: "#8fadff", 400: "#5b86ff" },
        acid: "#c8ff3d",
        paper: { DEFAULT: "#f2eee4", dark: "#e6e0d0" },
        ink: "#0a1020",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        blink: { "50%": { opacity: "0" } },
        floatY: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseRing: { "0%": { transform: "scale(.5)", opacity: ".8" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
        wave: { "0%,100%": { transform: "scaleY(.2)" }, "50%": { transform: "scaleY(1)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        dash: { to: { strokeDashoffset: "-24" } },
        scrollCue: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        bubble: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "8%,78%": { opacity: "1", transform: "none" },
          "92%,100%": { opacity: "0", transform: "translateY(-4px)" },
        },
        crmMove: {
          "0%,22%": { transform: "translateX(0)" },
          "33%,55%": { transform: "translateX(calc(100% + 8px))" },
          "66%,88%": { transform: "translateX(calc(200% + 16px))" },
          "100%": { transform: "translateX(0)" },
        },
        fillPulse: { "0%": { transform: "scaleY(.18)" }, "100%": { transform: "scaleY(.95)" } },
        build: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "18%,80%": { transform: "scaleX(1)", opacity: "1" },
          "95%,100%": { transform: "scaleX(1)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1s steps(2) infinite",
        floatY: "floatY 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.8s ease-out infinite",
        wave: "wave 1.3s ease-in-out infinite",
        spinSlow: "spinSlow 30s linear infinite",
        dash: "dash 1.1s linear infinite",
        scrollCue: "scrollCue 1.8s ease-in-out infinite",
        bubble: "bubble 7s ease infinite both",
        crmMove: "crmMove 7s ease-in-out infinite",
        fillPulse: "fillPulse 2.6s ease-in-out infinite alternate",
        build: "build 6s ease infinite both",
      },
    },
  },
  plugins: [],
};

export default config;
