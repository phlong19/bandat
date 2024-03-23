import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";
import { success } from "../../constants/message";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: (data) => loginAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success(success.login);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoggingIn };
}
