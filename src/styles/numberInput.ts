import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    _focus: {
      borderWidth: 2,
      _dark: {
        borderColor: "secondary",
        boxShadow: "none",
      },
      _light: {
        borderColor: "primary",
        boxShadow: "none",
      },
    },
  },
});

export const numberInputTheme = defineMultiStyleConfig({ baseStyle });
