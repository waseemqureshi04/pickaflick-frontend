/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Netflix-inspired Premium Red
        brand: {
          light: "#E50914",
          DEFAULT: "#B81D24",
          dark: "#831010",
        },
        // Deep "Cinematic" Backgrounds (Replacing standard black)
        cinema: {
          900: "#000000",
          800: "#141414", // Standard Netflix dark bg
          700: "#18181b",
        },
      },
      fontFamily: {
        // We will set this up in index.css
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%, rgba(0,0,0,0.8) 100%)',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};