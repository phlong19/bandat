import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    _dark: {
      _focus: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px #ffe5a7",
      },
    },
  },
});

export const numberInputTheme = defineMultiStyleConfig({ baseStyle });
