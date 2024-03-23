import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePost as deleteAPI } from "../../services/apiRE";
import { success } from "../../constants/message";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: (postID, level, userID) => deleteAPI(postID, level, userID),
    onSuccess: () => {
      toast.success(success.deletePost);
      queryClient.invalidateQueries({ queryKey: ["REList"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deletePost };
}
