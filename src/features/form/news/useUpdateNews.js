import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateNews } from "../../../services/apiNews";
import { success } from "../../../constants/message";

export function useUpdateNews(onClose) {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateNews(data),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["SingleNews"] });
      queryClient.invalidateQueries({ queryKey: ["NewsList"] });
      toast.success(success.updateNews);
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { update, isUpdating };
}
