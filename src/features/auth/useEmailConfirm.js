import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resendEmailAPI } from "../../services/apiAuth";
import { success } from "../../constants/message";

export function useEmailConfirm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: sendEmail, isPending: isSending } = useMutation({
    mutationFn: (email) => resendEmailAPI(email),
    onSuccess: (data) => {
      console.log(data);
      toast.success(success.emailConfirm);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/tai-khoan");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { sendEmail, isSending };
}
