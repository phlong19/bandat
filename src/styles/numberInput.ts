import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    _focus: {
    _dark: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px var(--chakra-colors-secondary)",
      },_light:{
        borderColor: "primary",
        boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
      }
    },
  },
});

export const numberInputTheme = defineMultiStyleConfig({ baseStyle });
