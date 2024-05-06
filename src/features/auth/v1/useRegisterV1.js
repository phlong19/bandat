import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerV1 } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { success } from "../../../constants/message";

export function useRegisterV1() {
  const navigate = useNavigate();

  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: (data) => registerV1(data),
    onSuccess: () => {
      toast.success(success.signup);
      navigate("/kiem-tra-email");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, signup };
}
