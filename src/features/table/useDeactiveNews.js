import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { success } from "../../constants/message";
import { deactiveNews } from "../../services/apiNews";

export function useDeactiveNews() {
  const queryClient = useQueryClient();

  const { mutate: deactive, isPending: isDeactiving } = useMutation({
    mutationFn: (id) => deactiveNews(id),
    onSuccess: () => {
      toast.success(success.deactiveNews);
      queryClient.invalidateQueries({ queryKey: ["NewsList"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deactive, isDeactiving };
}
