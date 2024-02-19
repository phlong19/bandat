import { Button, useColorModeValue } from "@chakra-ui/react";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLogout } from "./useLogout";

function Logout() {
  const { isPending, logout } = useLogout();
  const scheme = useColorModeValue("primary", "secondary");
  const color = useColorModeValue("white", "black");

  return (
    <Button
      isLoading={isPending}
      leftIcon={<FaArrowRightFromBracket />}
      onClick={() => logout()}
      bg={scheme}
      color={color}
      _hover={{ opacity: 0.85 }}
      fontWeight={500}
    >
      Đăng xuất
    </Button>
  );
}

export default Logout;
