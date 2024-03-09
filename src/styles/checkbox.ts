import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  icon: {
    _dark: {
      bg: "secondary",
    },
  },
  control: {
    _checked: {
      _light: {
        bg: "primary",
        borderColor: "primary",
      },
      _dark: {
        bg: "secondary",
        borderColor: "secondary",
      },
    },
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
