import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const baseStyle = defineStyle({
  _dark: {
    [$startColor.variable]: "colors.blackAlpha.800",
    [$endColor.variable]: "colors.blackAlpha.400",
  },
});

export const skeletonTheme = defineStyleConfig({ baseStyle });
