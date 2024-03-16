import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <Button disabled={isPending} onClick={() => logout()} variant="light">
      {!isPending ? (
        <>
          <span className="px-1.5 text-lg">
            <FaArrowRightFromBracket />
          </span>
          <span>Đăng xuất</span>
        </>
      ) : (
        <Spinner />
      )}
    </Button>
  );
}

export default Logout;
