import { useQuery } from "@tanstack/react-query";
import { getHomepage } from "../../services/apiLand";

export function useHomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });

  return { data, isLoading, error };
}
