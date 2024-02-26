import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../services/apiGeneral";

export function useSearchbar(cityID, disID, wardID) {
  const city = cityID ? cityID : null;
  const dis = disID ? disID : null;
  const ward = wardID ? wardID : null;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["address", city, dis],
    queryFn: () => getAddress(city, dis, ward),
    // staleTime: Infinity,
  });

  return { data, isLoading, refetch };
}
