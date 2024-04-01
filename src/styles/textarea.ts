import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  _focus: {
    _light: {
      borderColor: "primary",
      boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
    },
    _dark: {
      borderColor: "secondary",
      boxShadow: "0 0 0 1px var(--chakra-colors-secondary)",
    },
  },
});

export const textareaTheme = defineStyleConfig({ baseStyle });
