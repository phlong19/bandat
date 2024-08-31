import { useQuery } from "@tanstack/react-query";
import { getFullProduct } from "../../services/apiProduct";

export function useGetRE(title: string, level: number) {
  
  const { data: product, isFetching } = useQuery({
    queryKey: ["product-details", title],
    queryFn: () => getFullProduct(title, level),
    staleTime: 5 * 60 * 1000, // 5p
    enabled: Boolean(title),
  });

  return { product, isFetching };
}
