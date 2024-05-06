import { useQuery } from "@tanstack/react-query";
import { getPostData } from "../../services/apiChart";

export function useGetREPostData(id, level) {
  const {
    data: { data, count } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["REPost-chart", id, level],
    queryFn: () => getPostData(id, level),
    staleTime: 60 * 1000,
  });

  return { data, count, isLoading, refetch };
}
