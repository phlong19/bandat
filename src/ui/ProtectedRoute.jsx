import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuShieldAlert } from "react-icons/lu";

import SpinnerFullPage from "./SpinnerFullPage";

import { useAuth } from "../context/UserContext";
import { error as errorMessage } from "../constants/message";

function ProtectedRoute({ children, accessLevel, accSettings = false }) {
  const { data, level, isAuthenticated, email, isLoading } = useAuth();
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
      // has user data but not has email or not confirmed email yet
      else if (!accSettings && data && (!email || !data.email_confirmed_at)) {
        toast.error(errorMessage.notAuthen, {
          icon: (
            <span className="text-2xl text-yellow-500">
              <LuShieldAlert />
            </span>
          ),
        });
        return navigate("/xac-thuc-email");
      }
    }
  }, [
    data,
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

  if (data && isAuthenticated && email && data.email_confirmed_at) {
    return children;
  }
}

export default ProtectedRoute;
