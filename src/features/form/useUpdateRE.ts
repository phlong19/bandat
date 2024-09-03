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
      // set null for the just updated post
      queryClient.removeQueries({ queryKey: ["product-details"] });
      // must set exact
      queryClient.invalidateQueries({
        queryKey: ["product-admin"],
        exact: true,
      });
      toast.success(success.updatePost);
      navigate("/quan-ly-san-pham");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { update, isUpdating };
}
