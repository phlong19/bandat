import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    _dark: {
      _focus: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px #ffe5a7",
      },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
