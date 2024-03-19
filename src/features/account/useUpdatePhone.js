import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhone } from "../../services/apiAccount";
import { success } from "../../constants/message";
import { toast } from "react-hot-toast";

export function useUpdatePhone() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updatePhone(data),
    onSuccess: () => {
      toast.success(success.updatePhone);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["query-phone"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
