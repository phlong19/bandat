import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullTypeList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useGetFullTypeList(sub) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("type-page")) || 1;

  const { data: { data: types, count: typesCount } = {}, isLoading } = useQuery(
    {
      queryKey: ["TypeList", page],
      queryFn: () => getFullTypeList(page),
      enabled: !sub,
    },
  );

  // PRE-FETCHING
  const totalPage = Math.ceil(typesCount / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["TypeList", page + 1],
      queryFn: () => getFullTypeList(page + 1),
      enabled: !sub,
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["TypeList", page - 1],
      queryFn: () => getFullTypeList(page - 1),
      enabled: !sub,
    });

  return { types, typesCount, isLoading };
}
