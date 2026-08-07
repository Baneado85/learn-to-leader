import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        fredoka: ["var(--font-fredoka)"],
      },
      colors: {
        brand: {
          primary: "#E76F51",
          secondary: "#F4A261",
          accent: "#E9C46A",
          success: "#2A9D8F",
          dark: "#264653",
          light: "#F4F1DE",
        },
      },
      keyframes: {
        bobbing: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
      },
      animation: {
        bobbing: "bobbing 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
