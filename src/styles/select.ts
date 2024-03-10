import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontSize:'sm',
    _focus: {
      _dark: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px var(--chakra-colors-secondary)",
      },
      _light: {
        borderColor: "primary",
        boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
      },
    },
  },
});

export const selectTheme = defineMultiStyleConfig({ baseStyle });
