import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { markSold as markSoldAPI } from "../../services/apiRE";
import { success } from "../../constants/message";

export function useMarkSold() {
  const queryClient = useQueryClient();

  const { mutate: markSold } = useMutation({
    mutationFn: (id) => markSoldAPI(id),
    onSuccess: () => {
      toast.success(success.markSold);
      queryClient.invalidateQueries({ queryKey: ["REList"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { markSold };
}
