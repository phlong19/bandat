import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStatus } from "../../services/apiProduct";

export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: (data: { statusID: number; productID: number }) =>
      updateStatus(data),
    onSuccess: (data) => {
      toast.success(`Cập nhật trạng thái sản phẩm [${data[0].name}] thành công`);
      queryClient.invalidateQueries({ queryKey: ["product-admin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { update };
}
