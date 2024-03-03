import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  dialog: {
    _dark: {
      bg: `darker`,
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
