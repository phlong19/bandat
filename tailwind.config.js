/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#f6f6f6",
        dark: "#2b2b2b",
        primary: "#3949AB",
        // primary: "#1a237e",
        "prim-light": "#babff1",
        secondary: "#FFCC80",
        // secondary: "#ffb60a",
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
        xs: "350px",
        xl: "1200px",
        "2xl": "1440px",
        "3xl": "1500px",
      },
    },
  },
  plugins: [],
};
