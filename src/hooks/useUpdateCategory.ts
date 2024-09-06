import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCategory } from "../services/apiCategory";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: any) => updateCategory(formData),
    onSuccess: (data) => {
      toast.success(`Cập nhật danh mục ${data[0].name} thành công`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
