import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuShieldAlert } from "react-icons/lu";

import SpinnerFullPage from "./SpinnerFullPage";

import { useAuth } from "../context/UserContext";
import { error as errorMessage } from "../constants/message";

function ProtectedRoute({ children, accessLevel }) {
  const { data, level, isAuthenticated, isLoading } = useAuth();
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
        navigate("/dang-nhap");
      } else if (data && level < accessLevel) {
        navigate("/khong-co-quyen");
      }
    }
  }, [data, isAuthenticated, isLoading, navigate, accessLevel, level]);

  if (isLoading) return <SpinnerFullPage />;

  if (data && isAuthenticated) return children;
}

export default ProtectedRoute;
