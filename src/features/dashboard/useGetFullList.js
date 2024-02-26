import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullREList } from "../../services/apiManage";

export function useGetFullList(id) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: reList = { data: [], count: 0 }, isLoading } = useQuery({
    queryKey: ["REList", page],
    queryFn: () => getFullREList(id, page),
  });

  return { reList, isLoading };
}
