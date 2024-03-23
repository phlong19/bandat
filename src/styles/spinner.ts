import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const bold = defineStyle({
  borderWidth: 4, // change the thickness of the spinner
});

export const spinnerTheme = defineStyleConfig({
  baseStyle: {
    _light: {
      color: "primary",
    },
    _dark: {
      color: "secondary",
    },
  },
  variants: { bold },
  defaultProps: {
    size: "lg",
    variant: "bold",
  },
});
