import { extendTheme, defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { menuTheme } from "./menu";
import { cardTheme } from "./card";
import { inputTheme } from "./input";
import { selectTheme } from "./select";
import { checkboxTheme } from "./checkbox";

const colors = {
  primary: "#1a237e",
  "prim-light": "#babff1",
  secondary: "#ffb60a",
  "sec-light": "#ffe5a7",
  light: "#f6f6f6",
  dark: "#222",
};

const pagi = defineStyle({
  borderRadius: "lg",
  bg: "gray.200",
  _hover: {
    bg: "blue.600",
    color: "white",
  },
  _dark: {
    bg: "dark",
    _hover: {
      bg: "secondary",
      color: "black",
    },
  },
});

const buttonTheme = defineStyleConfig({
  variants: { pagi },
});

export const theme = extendTheme({
  colors,
  components: {
    Menu: menuTheme,
    Button: buttonTheme,
    Card: cardTheme,
    Input: inputTheme,
    Select: selectTheme,
    Checkbox: checkboxTheme,
  },
  font: {
    lexend: `'Lexend, sans-serif'`,
    roboto: `'Roboto',sans-serif`,
    montserrat: `'Montserrat',sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: `"Lexend", sans-serif`,
        color: mode("black", "white")(props),
        bg: mode("white", "dark")(props),
        lineHeight: "base",
      },
    }),
  },
});
