import { useQuery } from "@tanstack/react-query";
import { getPostData } from "../../services/apiChart";

export function useGetREPostData() {
  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["REPost-chart"],
    queryFn: () => getPostData(null, null),
    staleTime: 5 * 60 * 1000,
  });

  return { data, count, isLoading };
}
