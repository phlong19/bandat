import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAddress } from "../../services/apiGeneral";

export function useSearchbar() {
  const [searchParams] = useSearchParams();

  const city =
    searchParams.get("city") !== "none" ? searchParams.get("city") : null;
  const dis =
    searchParams.get("dis") !== "none" ? searchParams.get("dis") : null;
  const ward =
    searchParams.get("ward") !== "none" ? searchParams.get("ward") : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["address", city, dis],
    queryFn: () => getAddress(city, dis, ward),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}
