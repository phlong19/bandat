import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateProduct } from "../../services/apiProduct";
import { success } from "../../constants/message";

export function useUpdateRE() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateProduct(data),

    onSuccess: () => {
      navigate("/quan-ly-san-pham");
      toast.success(success.updatePost);
      queryClient.removeQueries({ queryKey: ["product-details"] });

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["product-admin"],
        });
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { update, isUpdating };
}
