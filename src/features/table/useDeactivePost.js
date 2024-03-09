import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";
import { deactivePost } from "../../services/apiRE";

export function useDeactivePost() {
  const queryClient = useQueryClient();

  const { mutate: deactive } = useMutation({
    mutationFn: (id) => deactivePost(id),
    onSuccess: () => {
      toast.success(success.deactivePost);
      queryClient.invalidateQueries({ queryKey: ["REList"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deactive };
}
