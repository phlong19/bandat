import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../services/apiLand";
import { useSearchParams } from "react-router-dom";

export function useSearchbar() {
  const [searchParams] = useSearchParams();

  const city =
    searchParams.get("city") !== "none" ? searchParams.get("city") : null;
  const dis = searchParams.get("dis") ? searchParams.get("dis") : null;
  const ward = searchParams.get("ward") ? searchParams.get("ward") : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["address", city, dis],
    queryFn: () => getAddress(city, dis, ward),
  });

  return { data, isLoading, error };
}
