import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiRE";

export function useGetRE(title) {
  const { data: post, isFetching } = useQuery({
    queryKey: ["singleRE"],
    queryFn: () => getPost(title),
    staleTime: 5 * 60 * 1000, // 5p
    enabled: Boolean(title),
  });

  return { post, isFetching };
}
