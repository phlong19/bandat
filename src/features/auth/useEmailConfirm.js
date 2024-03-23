import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resendEmailAPI } from "../../services/apiAuth";
import { success } from "../../constants/message";

export function useEmailConfirm() {
  const navigate = useNavigate();

  const { mutate: sendEmail, isPending: isSending } = useMutation({
    mutationFn: (email) => resendEmailAPI(email),
    onSettled: () => {
      toast.success(success.emailConfirm, { duration: 8000 });
      navigate("/");
    },
  });

  return { sendEmail, isSending };
}
