import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
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
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
