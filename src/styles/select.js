import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    _focus: {
      _dark: {
        borderColor: "secondary",
        boxShadow: "0 0 0 1px #ffe5a7",
      },
    },
  },
});

export const selectTheme = defineMultiStyleConfig({ baseStyle });
