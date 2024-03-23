import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updatePost } from "../../services/apiRE";
import { success } from "../../constants/message";

export function useUpdateRE() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updatePost(data),

    onSuccess: () => {
      // set null for the just updated post
      queryClient.removeQueries({ queryKey: ["RE-details"] });
      // must set exact
      queryClient.invalidateQueries({ queryKey: ["REList"], exact: true });
      toast.success(success.updatePost);
      navigate("/quan-ly-bai-viet");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { update, isUpdating };
}
