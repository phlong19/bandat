import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryList } from "../../services/apiSearch";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useSearch(formData) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "created_at-desc";

  const {
    data: { data: queryData, count: queryCount } = {},
    isLoading: isQuerying,
  } = useQuery({
    queryKey: ["query-results", formData, sort, page],
    queryFn: () => queryList({ ...formData, sort, page }),
    enabled: Boolean(formData?.reType),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(queryCount / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["query-results", formData, sort, page + 1],
      queryFn: () => queryList({ ...formData, sort, page: page + 1 }),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["query-results", formData, sort, page - 1],
      queryFn: () => queryList({ ...formData, sort, page: page - 1 }),
    });

  return { queryData, queryCount, isQuerying };
}
