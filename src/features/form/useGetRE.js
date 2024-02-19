import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiRE";

export function useGetRE(title) {
  const { data: post, isFetching } = useQuery({
    queryKey: ["RE", title],
    queryFn: () => getPost(title),
  });

  return { post, isFetching };
}
