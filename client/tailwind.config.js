/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../shared/catalogs/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#060816",
          800: "#0b0f22",
          700: "#131835",
          600: "#1d2347",
          500: "#2a3160",
        },
        accent: {
          keyboard: "#8b7cff",   // indigo
          fretted:  "#ffa94a",   // amber
          bowed:    "#ff5574",   // crimson
          perc:     "#94a3b8",   // slate
          indian:   "#ffb347",   // saffron-gold
          voice:    "#5eead4",   // teal
        },
      },
      fontFamily: {
        display: ['"Canela"', '"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        body: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(139,124,255,0.55)",
        panel: "0 24px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "scroll-ribbon": "scrollRibbon 12s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%,100%": { opacity: "0.85", transform: "scale(1)" },
          "50%":     { opacity: "1",    transform: "scale(1.03)" },
        },
        scrollRibbon: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
