import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullOrderList } from "../services/apiOrder";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";

export function useGetFullOrderList(userID: string, textQuery: string) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const sort = searchParams.get("sort") || "created_at-desc";
  const filter = searchParams.get("filter") || "none";

  const { data: { data, count } = {}, isLoading: isFetching } = useQuery({
    queryKey: ["order-admin", sort, filter, textQuery, page],
    queryFn: () => getFullOrderList({ userID, page, textQuery, sort, filter }),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(Number(count) / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["order-admin", sort, filter, textQuery, page + 1],
      queryFn: () =>
        getFullOrderList({ userID, sort, filter, textQuery, page: page + 1 }),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["order-admin", sort, filter, textQuery, page - 1],
      queryFn: () =>
        getFullOrderList({ userID, sort, filter, textQuery, page: page - 1 }),
    });

  return { data, count, isFetching };
}
