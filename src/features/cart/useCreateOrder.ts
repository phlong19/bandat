import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder, FormData } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";

export function useCreateOrder() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createOrder(formData),
    onSuccess: () => {
      toast.success(
        "Đơn hàng đã được tạo thành công, chúng tôi sẽ liên lạc trong thời gian sớm nhất",
        { duration: 8000 },
      );
      navigate("/dat-hang-thanh-cong");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
