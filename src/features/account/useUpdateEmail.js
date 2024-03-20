import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";
import { updateEmail } from "../../services/apiAuth";

export function useUpdateEmail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }) => updateEmail(email),
    onSuccess: () => {
      toast.success(success.updateEmail, { duration: 10000 });
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
