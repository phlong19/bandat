import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updatePassword } from "../../services/apiAccount";
import { success } from "../../constants/message";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ password }) => updatePassword(password),
    onSuccess: () => {
      toast.success(success.updatePassword);
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
      localStorage.clear();
      navigate("/dang-nhap");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
