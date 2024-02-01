import { Avatar as ChakraAvatar, AvatarBadge } from "@chakra-ui/react";
import { PiSealCheckFill } from "react-icons/pi";

function Avatar({ fullName, avatar, onClick, mobile = false }) {
  return (
    <ChakraAvatar
      name={fullName}
      boxShadow="dark-lg"
      size={!mobile ? "sm" : "xl"}
      cursor="pointer"
      src={avatar}
      onClick={onClick}
    >
      {/* if user has verified account */}
      <AvatarBadge
        border={0}
        m={0}
        right={mobile ? 2 : 0}
        bottom={mobile ? 1 : 0}
      >
        <span
          className={`${
            !mobile ? "h-2.5 w-2.5" : "h-5 w-5"
          } absolute bg-white dark:bg-black`}
        ></span>
        <PiSealCheckFill
          fontSize={!mobile ? 20 : 40}
          className="z-[2] fill-[#00A3C4] dark:fill-[#ECC94B]"
        />
      </AvatarBadge>
    </ChakraAvatar>
  );
}

export default Avatar;
