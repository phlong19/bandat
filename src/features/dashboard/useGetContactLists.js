import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getContactLists } from "../../services/apiManage";

export function useGetContactLists(sub) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("contact-page")) || 1;

  const {
    data: { count: contactCount = 0, data: contacts } = {},
    isLoading: isFetchingContact,
  } = useQuery({
    queryKey: ["ContactList"],
    queryFn: () => getContactLists(page),
    enabled: !sub,
  });

  return { contacts, contactCount, isFetchingContact };
}
