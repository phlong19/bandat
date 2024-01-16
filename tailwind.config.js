/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#f6f6f6",
        dark: "#222",
        primary: "#1a237e",
        "prim-light": "#babff1",
        secondary: "#ffb60a",
        "sec-light": "#ffe5a7",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      minWidth: {
        30: "120px",
      },
      screens: {
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
