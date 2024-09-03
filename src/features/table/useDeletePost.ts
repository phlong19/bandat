import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteProduct } from "../../services/apiProduct";
import { success } from "../../constants/message";

interface Props {
  productID: number;
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: ({ productID }: Props) => deleteProduct({ productID }),
    onSuccess: () => {
      toast.success(success.deletePost);
      queryClient.invalidateQueries({ queryKey: ["product-admin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deletePost };
}
