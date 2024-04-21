import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getList } from "../../services/apiRE";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useListingPage(purType, search) {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const sort = searchParams.get("sort") || "created_at-desc";
  const page = Number(searchParams.get("page")) || 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["REList-client", purType, type, sort, page],
    queryFn: () => getList(purType, type, sort, page),
    enabled: !search,
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["REList-client", purType, type, sort, page + 1],
      queryFn: () => getList(purType, type, sort, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["REList-client", purType, type, sort, page - 1],
      queryFn: () => getList(purType, type, sort, page - 1),
    });

  return { data, count, isLoading };
}
