import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../services/apiLand";

export function useAddress(city, dis, ward) {
  const { data, isLoading } = useQuery({
    queryFn: ["address", city, dis, ward],
    queryKey: () => getAddress(city, dis, ward),
    staleTime: Infinity,
  });

  return { data, isLoading };
}
