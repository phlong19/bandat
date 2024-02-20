import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { markSold as markSoldAPI } from "../../services/apiRE";

export function useMarkSold() {
  const { mutate: markSold, isPending: isMarking } = useMutation({
    mutationFn: (id) => markSoldAPI(id),
    onSuccess: () => {
      toast.success("danh dau la da ban thanh cong");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { markSold, isMarking };
}
