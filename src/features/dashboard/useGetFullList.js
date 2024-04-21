import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullREList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";
import { sortList } from "../../constants/navlink";

export function useGetFullList(id, query) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || sortList[0].value;
  const filter = searchParams.get("filter") || "none";

  const { data: { data: reList, count } = {}, isLoading } = useQuery({
    queryKey: ["REList", sort, filter, query, page],
    queryFn: () => getFullREList(id, sort, filter, query, page),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["REList", sort, filter, query, page + 1],
      queryFn: () => getFullREList(id, sort, filter, query, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["REList", sort, filter, query, page - 1],
      queryFn: () => getFullREList(id, sort, filter, query, page - 1),
    });

  return { reList, isLoading, count };
}
