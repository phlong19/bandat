import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../services/apiLand";
import { useSearchParams } from "react-router-dom";

export function useSearchbar() {
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const dis = searchParams.get("dis");
  const ward = searchParams.get("ward");

  const { data, isLoading, error } = useQuery({
    queryKey: ["address",city,dis],
    queryFn: () => getAddress(city, dis, ward),
  });

  return { data, isLoading, error };
}
