import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Spinner from "./Spinner";

import {
  ADMIN_LEVEL,
  EDITOR_LEVEL,
  emailsList,
} from "../constants/anyVariables";

function ProtectedRoute({ children, accessLevel }) {
  const navigate = useNavigate();
  const { user, level, isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <Spinner inButton={false} />
      </div>
    );
  // FIX
  console.log(emailsList);

  if (isAuthenticated && user) {
    if (accessLevel === EDITOR_LEVEL && level >= accessLevel) {
      return children;
    }
    // further check for admin
    else if (
      accessLevel === ADMIN_LEVEL &&
      emailsList.includes(user.email) &&
      level === ADMIN_LEVEL
    ) {
      return children;
    }
  } else {
    toast.error("may deo co quyen xem trang nay, cut!");
    // user not login => go to login page
    if (!user) navigate("/dang-nhap");
    // not meet the require permission => go home
    navigate("/");
  }
}

export default ProtectedRoute;
