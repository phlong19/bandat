import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuShieldAlert } from "react-icons/lu";

import SpinnerFullPage from "./SpinnerFullPage";

import { useAuth } from "../context/UserContext";
import { error as errorMessage } from "../constants/message";

function ProtectedRoute({ children, accessLevel }) {
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
      } else if (data && !email) {
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
  }, [data, isAuthenticated, isLoading, email, navigate, accessLevel, level]);

  if (isLoading) return <SpinnerFullPage />;

  if (data && isAuthenticated && email) return children;
}

export default ProtectedRoute;
