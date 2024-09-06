import { useQuery } from "@tanstack/react-query";
import { getComposedOrderData } from "../services/apiChart";

export default function useGetComposedOrderData() {
  const {
    data: { data: allData, count } = {},
    refetch,
    isLoading: isLoadingAllData,
  } = useQuery({
    queryKey: ["composed-chart"],
    queryFn: getComposedOrderData,
  });

  return { allData, isLoadingAllData, count, refetch };
}
