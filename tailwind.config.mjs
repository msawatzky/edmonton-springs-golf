/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#f6f5f5",
          100: "#e6e3e4",
          500: "#3b3436",
          700: "#262123",
          900: "#120f11"
        },
        clubred: {
          100: "#fbe5eb",
          500: "#c40f39",
          700: "#8d0b29",
          900: "#5b071a"
        },
        cream: "#faf8f6",
        ink: "#151214"
      },
      fontFamily: {
        display: ["Oswald", "Arial Narrow", "sans-serif"],
        body: ["Inter", "Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  plugins: []
};
