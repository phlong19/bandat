import { useQuery } from "@tanstack/react-query";
import { getCity } from "../../services/apiLand";

export function useSearchbar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["city"],
    queryFn: getCity,
  });

  return { data, isLoading, error };
}
