import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  return {
    email: data?.possibleUser.email,
    user: data?.possibleUser,
    data: data?.profile?.[0],
    isLoading,
    isAuthenticated: data?.possibleUser?.role === "authenticated",
    level: data?.profile?.[0].level,
  };
}
