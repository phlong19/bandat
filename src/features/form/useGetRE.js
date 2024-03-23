import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiManage";

export function useGetRE(title, level, userID) {
  const { data: post, isFetching } = useQuery({
    queryKey: ["RE-details", title],
    queryFn: () => getPost(title, level, userID),
    staleTime: 5 * 60 * 1000, // 5p
    enabled: Boolean(title),
  });

  return { post, isFetching };
}
