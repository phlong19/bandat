import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { approvePost } from "../../services/apiRE";

export function useApprovePost() {
  const queryClient = useQueryClient();
  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: (id) => approvePost(id),
    onSuccess: (data) => {
      console.log(data);
      toast.success("duyet bai thanh cong");
      queryClient.invalidateQueries({ refetchType: "active" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { approve, isApproving };
}
