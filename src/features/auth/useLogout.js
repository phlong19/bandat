import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutAPI,
    onSettled: () => {
      queryClient.setQueryData(["user"], null);
      toast.success(success.logout);
      navigate("/dang-nhap", { replace: true });
    },
  });

  return { isPending, logout };
}
