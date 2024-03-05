import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";
import { deleteNews } from "../../services/apiNews";

export function useDeleteNews() {
  const queryClient = useQueryClient();

  const { mutate: deleted, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NewsList"] });
      toast.success(success.deleteNews);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { deleted, isDeleting };
}
