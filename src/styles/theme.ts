import {
  extendTheme,
  defineStyle,
  defineStyleConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { menuTheme } from "./menu";
import { cardTheme } from "./card";
import { inputTheme } from "./input";
import { selectTheme } from "./select";
import { checkboxTheme } from "./checkbox";
import { popoverTheme } from "./popover";
import { numberInputTheme } from "./numberInput";
import { modalTheme } from "./modal";

const colors = {
  primary: "#79B473",
  "prim-light": "#babff1",
  secondary: "#79B473",
  "sec-light": "#ffe5a7",
  light: "#f6f6f6",
  dark: "#2b2b2b",
  darker: "#202020",
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
    Popover: popoverTheme,
    NumberInput: numberInputTheme,
    Modal: modalTheme,
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
        bg: mode("white", "darker")(props),
        lineHeight: "base",
      },
    }),
  },
});
