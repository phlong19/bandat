import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLogout } from "./useLogout";
import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";

function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <Button disabled={isPending} onClick={() => logout()}>
      {!isPending ? (
        <span className="px-1.5 text-lg">
          <FaArrowRightFromBracket />
        </span>
      ) : (
        <MiniSpinner />
      )}
    </Button>
  );
}

export default Logout;
