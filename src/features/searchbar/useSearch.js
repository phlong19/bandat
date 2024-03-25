import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryList } from "../../services/apiSearch";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useSearch(formData) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: queryData, count: queryCount } = {},
    isLoading: isQuerying,
  } = useQuery({
    queryKey: ["query-results", formData, page],
    queryFn: () => queryList({ ...formData, page }),
    enabled: Boolean(formData?.reType),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(queryCount / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["query-results", formData, page + 1],
      queryFn: () => queryList({ ...formData, page: page + 1 }),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["query-results", formData, page - 1],
      queryFn: () => queryList({ ...formData, page: page - 1 }),
    });

  return { queryData, queryCount, isQuerying };
}
