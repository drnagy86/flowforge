// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          background: "#0a0a0a",   // rich black
          primaryText: "#e0e0e0",  // soft light gray
          secondaryText: "#a0a0a0", // mid gray
          accent: "#00b894",        // mint green
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  