import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../services/apiOrder";

export function useGetOrderDetails(orderID: number) {
  const { data: details, isLoading: isQuerying } = useQuery({
    queryFn: () => getOrderDetails(orderID),
    queryKey: ["order-details", orderID],
    enabled: Boolean(orderID),
    staleTime: Infinity,
  });

  return { details, isQuerying };
}
