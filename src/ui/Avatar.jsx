import { Avatar as ChakraAvatar, AvatarBadge } from "@chakra-ui/react";
import { PiSealCheckFill } from "react-icons/pi";
import { useAuth } from "../context/UserContext";

function Avatar({
  fullName,
  avatar,
  onClick,
  mobile = false,
  badge = true,
  csz = false,
}) {
  const { user } = useAuth();

  return (
    <ChakraAvatar
      name={fullName}
      boxShadow="dark-lg"
      size={csz ? "xl" : !mobile ? "sm" : "lg"}
      cursor="pointer"
      src={avatar}
      onClick={onClick}
    >
      {/* if user has verified account */}
      {badge && user?.phone_confirmed_at && (
        <AvatarBadge
          border={0}
          m={0}
          right={mobile ? 1.5 : 0.5}
          bottom={mobile ? 1 : 0.5}
        >
          <span
            className={`${
              !mobile ? "h-2 w-2" : "h-3.5 w-3.5"
            } absolute bg-white dark:bg-black`}
          ></span>
          <PiSealCheckFill
            fontSize={!mobile ? 18 : 28}
            className="z-[2] fill-secondary"
          />
        </AvatarBadge>
      )}
    </ChakraAvatar>
  );
}

export default Avatar;
