import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullNewsList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useGetFullNewsList(id) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["NewsList", page],
    queryFn: () => getFullNewsList(id, page),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["NewsList", page + 1],
      queryFn: () => getFullNewsList(id, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["NewsList", page - 1],
      queryFn: () => getFullNewsList(id, page - 1),
    });

  return { data, count, isLoading };
}
