import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    _dark: {
      bg: "dark",
    },
  },
  item: {
    _dark: {
      bg: "dark",
      _hover: {
        bg: "rgba(0,0,0,0.3)",
      },
    },
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
