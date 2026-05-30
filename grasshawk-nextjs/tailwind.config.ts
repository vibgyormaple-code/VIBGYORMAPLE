import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grasshawk: {
          red: "#C8102E",
          dark: "#1A1A1A",
          bg: "#F8F8F8",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      keyframes: {
        fadeInZoom: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-zoom": "fadeInZoom 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
