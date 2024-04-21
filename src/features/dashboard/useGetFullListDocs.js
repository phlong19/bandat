import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";
import { getFullDocsList } from "../../services/apiManage";

export function useGetFullListDocs(sub) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("doc-page")) || 1;

  const { data: { data, count } = {}, isLoading: isFetching } = useQuery({
    queryKey: ["DocsList", page],
    queryFn: () => getFullDocsList(page),
    enabled: !sub,
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(count / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["DocsList", page + 1],
      queryFn: () => getFullDocsList(page + 1),
      enabled: !sub,
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["DocsList", page - 1],
      queryFn: () => getFullDocsList(page - 1),
      enabled: !sub,
    });

  return { data, count, isFetching };
}
