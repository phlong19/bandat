import { useQuery } from "@tanstack/react-query";
import { getNew } from "../../services/apiNews";

export function useGetSingleNews(slug) {
  const { data, isLoading } = useQuery({
    queryKey: ["SingleNews"],
    queryFn: () => getNew(slug),
    enabled: Boolean(slug),
  });

  return { data, isLoading };
}
