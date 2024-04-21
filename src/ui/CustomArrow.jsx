import { IconButton } from "@chakra-ui/react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

function CustomArrow(props) {
  const { onClick, direction } = props;

  return (
    <IconButton
      visibility={{ base: "hidden", md: "visible" }}
      bg="dark"
      color="white"
      _hover={{ opacity: 0.9 }}
      border="1px solid var(--chakra-colors-light)"
      size="sm"
      p={{ base: 1, md: 2, lg: 2.5 }}
      id="slick-custom-arrow"
      aria-label={`slide-${direction}`}
      icon={
        direction === "next" ? (
          <TiChevronRightOutline fontSize={18} />
        ) : (
          <TiChevronLeftOutline fontSize={18} />
        )
      }
      position="absolute"
      top={{ base: "30%", sm: "40%" }}
      zIndex="5"
      onClick={onClick}
      {...(direction === "next" ? { right: 1 } : { left: 1 })}
    />
  );
}

export default CustomArrow;
