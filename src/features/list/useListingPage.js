import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getList } from "../../services/apiRE";

export function useListingPage(purType) {
  const { type } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data, isLoading } = useQuery({
    queryKey: ["listing-page", purType, type],
    queryFn: () => getList(purType, type, page),
  });

  return { data, isLoading };
}
