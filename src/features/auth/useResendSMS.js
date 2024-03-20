import { useMutation } from "@tanstack/react-query";
import { resendSMSAPI } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";

export function useResendSMS() {
  const { mutate: resendSMS, isPending: isSending } = useMutation({
    mutationFn: ({ phone }) => resendSMSAPI(phone),
    onSuccess: () => {
      toast.success(success.resendSMS);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { resendSMS, isSending };
}
