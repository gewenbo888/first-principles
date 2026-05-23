import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep blueprint void — near-black with a cold blue tint
        void: {
          950: "#06080f",
          900: "#0a0d18",
          800: "#0f1322",
          700: "#161b2e",
          600: "#1f2640",
          500: "#2b3354",
        },
        // axiom — cold reason-blue: the act of decomposition, the line of analysis
        axiom: {
          600: "#3b76e0",
          500: "#5b9dff",
          400: "#82b6ff",
          300: "#aecfff",
        },
        // spark — warm amber-gold: synthesis, insight, the rebuilt truth
        spark: {
          600: "#e0921f",
          500: "#ffb454",
          400: "#ffc878",
          300: "#ffdca6",
        },
        // node — violet: assumptions, the inherited beliefs to be questioned
        node: {
          600: "#8b53e6",
          500: "#b07cff",
          400: "#c79dff",
          300: "#ddc4ff",
        },
        // ghost — light text on the void, cool-neutral
        ghost: {
          50: "#f6f8fc",
          100: "#e7ecf5",
          200: "#c2cadb",
          300: "#94a0bb",
          500: "#5f6a85",
          700: "#363f57",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Newsreader"', "Georgia", "ui-serif", "serif"],
        sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Sans SC"', "sans-serif"],
        zhserif: ['"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        axiomcard: "inset 0 1px 0 rgba(174,207,255,0.07), 0 24px 60px -28px rgba(0,0,0,0.92)",
        glowaxiom: "0 0 40px -8px rgba(91,157,255,0.55)",
        glowspark: "0 0 36px -8px rgba(255,180,84,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
