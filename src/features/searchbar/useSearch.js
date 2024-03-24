import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryList } from "../../services/apiSearch";

export function useSearch(formData) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["query-results", page],
    queryFn: () => queryList({ ...formData, page }),
    enabled: Boolean(formData),
  });

  // TODO pre fetch

  return { data, count, isLoading };
}
