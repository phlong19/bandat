import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  body: {
    color: "black",
    _dark: {
      color: "white",
    },
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
