import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { success } from "../../constants/message";

export function useRegister() {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, phone, password }) =>
      registerAPI({ fullName, email, phone, password }),
    onSuccess: () => {
      toast.success(success.signup, { duration: 6000 });
      navigate("/dang-nhap");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isLoading, signup };
}
