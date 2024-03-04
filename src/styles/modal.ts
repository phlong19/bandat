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

const sizes = {
  six: definePartsStyle({ dialog: { maxW: "var(--chakra-sizes-6xl)" } }),
};

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
});
