import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNew } from "../../../services/apiNews";
import { success } from "../../../constants/message";

export function useCreateNews(onClose) {
  const queryClient = useQueryClient();

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (data) => createNew(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NewsList"] });
      toast.success(success.createNews);
      onClose()
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { create, isCreating };
}
