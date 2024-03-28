import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../services/apiChart";

export function useGetProfilesData() {
  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["profile-chart"],
    queryFn: getProfileData,
    staleTime: 30 * 60 * 1000,
  });

  return { data, count, isLoading };
}
