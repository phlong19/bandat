import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateAddress } from "../../services/apiAccount";
import { success } from "../../constants/message";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  const { mutate: updateAdd, isPending: isUpdatingAdd } = useMutation({
    mutationFn: (data) => updateAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      toast.success(success.updateAddress);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { updateAdd, isUpdatingAdd };
}
