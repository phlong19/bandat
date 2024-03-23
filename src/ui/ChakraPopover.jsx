import {
  Popover,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverArrow,
  Button,
  forwardRef,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa6";
import Avatar from "./Avatar";

function ChakraPopover({
  title,
  children,
  avatar = false,
  data,
  lazy = false,
}) {
  const CustomButton = forwardRef((props, ref) => (
    <Button {...props} ref={ref} variant="ghost" colorScheme="green" fontSize='14'>
      <FaRegHeart />
    </Button>
  ));

  const CustomAvatar = forwardRef((props, ref) => (
    <Button {...props} ref={ref} variant="none">
      <Avatar fullName={data.fullName} avatar={data.avatar} />
    </Button>
  ));

  return (
    <Popover isLazy={lazy}>
      <PopoverTrigger>
        {avatar ? <CustomAvatar /> : <CustomButton />}
      </PopoverTrigger>

      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />
        <PopoverHeader>{title}</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ChakraPopover;
