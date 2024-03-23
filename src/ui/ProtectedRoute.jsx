import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuShieldAlert } from "react-icons/lu";

import SpinnerFullPage from "./SpinnerFullPage";

import { useAuth } from "../context/UserContext";
import { error as errorMessage } from "../constants/message";

function ProtectedRoute({ children, accessLevel, accSettings = false }) {
  const { data, level, isAuthenticated, user, email, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !data) {
        toast.error(errorMessage.notAuthen, {
          icon: (
            <span className="text-2xl text-yellow-500">
              <LuShieldAlert />
            </span>
          ),
        });
        return navigate("/dang-nhap");
      } else if (data && level < accessLevel) {
        return navigate("/khong-co-quyen");
      }
      // user existed but not has email or not confirmed email yet
      else if (
        !accSettings &&
        data &&
        (!user.email || !user.email_confirmed_at)
      ) {
        toast.error(errorMessage.notAuthen, {
          icon: (
            <span className="text-2xl text-yellow-500">
              <LuShieldAlert />
            </span>
          ),
          duration: 5000,
        });
        return navigate("/xac-thuc-email");
      }
      // user doesn't add phone in profile
      else if (data && !data?.phone) {
        toast.error(errorMessage.notHavePhone, {
          icon: (
            <span className="text-2xl text-yellow-500">
              <LuShieldAlert />
            </span>
          ),
          duration: 5000,
        });
        return navigate("/tai-khoan");
      }
    }
  }, [
    data,
    user,
    isAuthenticated,
    isLoading,
    email,
    accSettings,
    navigate,
    accessLevel,
    level,
  ]);

  if (isLoading) return <SpinnerFullPage />;

  if (data && accSettings) {
    return children;
  }

  if (
    data &&
    isAuthenticated &&
    user.email &&
    user.email_confirmed_at &&
    data.phone
  ) {
    return children;
  }
}

export default ProtectedRoute;
