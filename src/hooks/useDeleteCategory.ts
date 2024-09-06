import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../services/apiCategory";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: (data) => {
      toast.success(`Đã xóa danh mục ${data[0].name}!`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteById };
}
