import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getList } from "../../services/apiLand";

export function useListingPage(purType) {
  const { type } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["listing-page", type],
    queryFn: () => getList(purType, type),
  });

  return { data, error, isLoading };
}
