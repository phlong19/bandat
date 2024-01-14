import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/dang-nhap", { replace: true });
    },
  });

  return { isPending, logout };
}
