import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullREList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useGetFullList(id) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const { data: { data: reList, count } = {}, isLoading } = useQuery({
    queryKey: ["REList", page],
    queryFn: () => getFullREList(id, page),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["REList", page + 1],
      queryFn: () => getFullREList(id, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["REList", page - 1],
      queryFn: () => getFullREList(id, page - 1),
    });

  return { reList, isLoading, count };
}
