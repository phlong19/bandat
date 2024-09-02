import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { success } from "../../constants/message";
import { createProduct } from "../../services/apiProduct";

export function useCreateRE() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: (reData) => createProduct(reData),
    onSuccess: () => {
      toast.success(success.createPost);
      queryClient.invalidateQueries({ queryKey: ["product-admin"] });
      navigate("/quan-ly-san-pham");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, create };
}
