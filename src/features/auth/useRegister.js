import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, phone, password }) =>
      registerAPI({ fullName, email, phone, password }),
    onSuccess: (data) => {
      console.log(data);
      // vietnamese later on
      toast.success(
        `User < ${data.user.user_metadata.fullName} > has been created. Please check for email verification.`,
      );
      navigate("/dang-nhap");
    },
    onError: (err) => toast.error(err.message),
  });

  // duplicate name, so register => signup :(
  return { isLoading, signup };
}
