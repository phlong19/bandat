import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  popper: {
    boxShadow: "dark-lg",
    borderRadius: "md",
    background: "white",
    border: "white",
    _dark: {
      background: "black",
      border: "black",
    },
  },
  header: {
    bg: "light",
    _dark: {
      bg: "dark",
    },
  },
  body: {
    bg: "white",
    border: "white",
    _dark: {
      bg: "darker",
    },
  },
});
export const popoverTheme = defineMultiStyleConfig({ baseStyle });
