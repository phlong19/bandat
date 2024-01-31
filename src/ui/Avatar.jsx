import { Avatar as ChakraAvatar, AvatarBadge } from "@chakra-ui/react";
import { PiSealCheckFill } from "react-icons/pi";

function Avatar({ fullName, avatar, onClick }) {
  return (
    <ChakraAvatar
      name={fullName}
      boxShadow="dark-lg"
      size="sm"
      cursor='pointer'
      src={avatar}
      onClick={onClick}
    >
      {/* if user has verified account */}
      <AvatarBadge border={0} m={0}>
        <span className="absolute h-2.5 w-2.5 bg-white dark:bg-black"></span>
        <PiSealCheckFill
          fontSize={20}
          className="z-[2] fill-[#00A3C4] dark:fill-[#ECC94B]"
        />
      </AvatarBadge>
    </ChakraAvatar>
  );
}

export default Avatar;
