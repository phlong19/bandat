import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  primary: "#1a237e",
  "prim-light": "#babff1",
  secondary: "#ffb60a",
  "sec-light": "#ffe5a7",
  light: "#f6f6f6",
  dark: "#222",
};

export const theme = extendTheme({
  colors,
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Roboto, sans-serif",
        color: mode("black", "white")(props),
        bg: mode("white", "dark")(props),
        lineHeight: "base",
      },
    }),
  },
});
