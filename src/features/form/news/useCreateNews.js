import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createNew } from "../../../services/apiNews";
import { success } from "../../../constants/message";

export function useCreateNews() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (data) => createNew(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NewsFullList"] });
      toast.success(success.createNews);
      navigate("/quan-ly-tin-tuc");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { create, isCreating };
}
