import { useQuery } from "@tanstack/react-query";
import { getPostData } from "../../services/apiChart";

export function useGetREPostByPurType(purType, dateRange) {
  const {
    data: { data, count } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["REPost-chart", purType, dateRange],
    queryFn: () => getPostData(purType, dateRange),
    staleTime: 5 * 60 * 1000,
  });

  return { data, count, isLoading, refetch };
}
