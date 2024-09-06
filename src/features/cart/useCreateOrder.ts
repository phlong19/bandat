import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder, FormData } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { order } from "../../redux/cartSlice";

export function useCreateOrder() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createOrder(formData),
    onSuccess: () => {
      toast.success(
        "Đơn hàng đã được tạo thành công, chúng tôi sẽ liên lạc trong thời gian sớm nhất",
        { duration: 8000 },
      );
      navigate("/dat-hang-thanh-cong", { state: { stage: 3 } });
      dispatch(order());
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
