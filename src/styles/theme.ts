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
import { spinnerTheme } from "./spinner";
import { skeletonTheme } from "./skeleton";
import { textareaTheme } from "./textarea";

const colors = {
  light: "#f6f6f6",
  dark: "#2b2b2b",
  darker: "#202020",
  primary: "#52AA5E",
  secondary: "#79B473",
  "prim-light": "#D6EBD9",
  "sec-light": "#D9E9D8",
};

const pagi = defineStyle({
  alignSelf: "center",
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "lg",
  bg: "gray.200",
  _hover: {
    bg: "primary",
  },
  _dark: {
    bg: "dark",
    _hover: {
      bg: "secondary",
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
    Spinner: spinnerTheme,
    Skeleton: skeletonTheme,
    Textarea: textareaTheme,
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
