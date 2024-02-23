import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createPost } from "../../services/apiRE";
import { success } from "../../constants/message";

export function useCreateRE() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: (reData) => createPost(reData),
    onSuccess: () => {
      toast.success(success.createPost);
      queryClient.invalidateQueries({ queryKey: ["REList"], exact: true });
      navigate("/quan-ly-bai-viet");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isCreating, mutate };
}
