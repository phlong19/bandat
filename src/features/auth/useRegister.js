import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { success } from "../../constants/message";

export function useRegister(setProgress, setStep) {
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: (data) => registerAPI(data),
    onSuccess: () => {
      toast.success(success.signup);
      setProgress((currentProgress) => currentProgress + 49);
      setStep(2);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isLoading, signup };
}
