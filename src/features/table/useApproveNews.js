import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveNews } from "../../services/apiNews";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";

export function useApproveNews() {
  const queryClient = useQueryClient();

  const { mutate: approved, isPending: isApproving } = useMutation({
    mutationFn: (id) => approveNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NewsList"] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success(success.approveNews);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { approved, isApproving };
}
