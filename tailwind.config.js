/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#f6f6f6",
        dark: "#2b2b2b",
        darker: "#202020",
        primary: "#31572C",
        secondary: "#79B473",
        "prim-light": "#babff1",
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
