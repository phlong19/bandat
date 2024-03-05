import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    _dark: {
      _focus: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px var(--chakra-colors-secondary)",
      },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
