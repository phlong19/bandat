import { useQuery } from "@tanstack/react-query";
import { test } from "../../services/apiTest";

export function useData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sell"],
    queryFn: test,
  });

  return { data, isLoading, error };
}
