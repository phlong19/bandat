import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullNewsList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";
import { sortNewsList } from "../../constants/navlink";

export function useGetFullNewsList(id) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || sortNewsList[0].value;
  const filter = searchParams.get("filter") || "none";

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["NewsList", sort, filter, page],
    queryFn: () => getFullNewsList(id, sort, filter, page),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["NewsList", sort, filter, page + 1],
      queryFn: () => getFullNewsList(id, sort, filter, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["NewsList", sort, filter, page - 1],
      queryFn: () => getFullNewsList(id, sort, filter, page - 1),
    });

  return { data, count, isLoading };
}
