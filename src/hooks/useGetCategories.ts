import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/apiCategory";

export function useGetCategories() {
  const { data: { categoryTree } = {}, isLoading: isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1 * 60 * 60, // 1 hour
  });

  return { categoryTree, isFetching };
}
