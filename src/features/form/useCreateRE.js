import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createNewREPost } from "../../services/apiLand";

export function useCreateRE() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: (reData) => createNewREPost(reData),
    onSuccess: () => {
      toast.success("tao bai dang thanh cong, chi con cho duoc duyet thoi :3");
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/quan-ly-bai-viet");
    },
    onError: (err) => {
      // for dev
      toast.error(err.message);
    },
  });

  return { isCreating, mutate };
}
