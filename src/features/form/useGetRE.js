import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiRE";
import { maxLength, minLength } from "../../constants/anyVariables";

export function useGetRE(title) {
  const { data: post, isFetching } = useQuery({
    queryKey: ["RE", title],
    queryFn: () => getPost(title),
    enabled: title > minLength && title < maxLength,
  });

  return { post, isFetching };
}
