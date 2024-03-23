import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { verify } from "../../services/apiAuth";
import { success } from "../../constants/message";

export function useVerifyPhone() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ phone, token }) => verify(phone, token),
    onSuccess: (data) => {
      console.log(data);
      toast.success(success.verifyPhone);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
