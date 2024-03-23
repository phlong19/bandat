import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { approvePost } from "../../services/apiRE";
import { success } from "../../constants/message";

export function useApprovePost() {
  const queryClient = useQueryClient();
  const { mutate: approve } = useMutation({
    mutationFn: (id) => approvePost(id),
    onSuccess: () => {
      toast.success(success.approvePost);
      queryClient.invalidateQueries({ queryKey: ["REList"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { approve };
}
