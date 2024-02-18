import { Button } from "@chakra-ui/react";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLogout } from "./useLogout";

function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <Button
      isLoading={isPending}
      leftIcon={<FaArrowRightFromBracket />}
      onClick={() => logout()}
      variant="outline"
      fontWeight={500}
    >
      Đăng xuất
    </Button>
  );
}

export default Logout;
