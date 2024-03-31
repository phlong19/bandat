import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFullUserList } from "../../services/apiManage";
import { LIMIT_PER_PAGE } from "../../constants/anyVariables";

export function useGetFullUsers(query) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("user-page")) || 1;
  const option = searchParams.get("option") || "fullName";

  const {
    data: { data: users, count: usersCount } = {},
    isLoading: isUsering,
  } = useQuery({
    queryKey: ["ProfileList", query, page],
    queryFn: () => getFullUserList(query, option, page),
  });

  // PRE-FETCHING
  const totalPage = Math.ceil(usersCount / LIMIT_PER_PAGE);
  // A. next page
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["ProfileList", query, page + 1],
      queryFn: () => getFullUserList(query, option, page + 1),
    });
  }
  // B. prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["ProfileList", query, page - 1],
      queryFn: () => getFullUserList(query, option, page - 1),
    });

  return { users, usersCount, isUsering };
}
