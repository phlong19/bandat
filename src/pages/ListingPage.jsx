import { useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import List from "../features/list/List";

import { useListingPage } from "../features/list/useListingPage";
import { useSearch } from "../features/searchbar/useSearch";
import { purTypeFalse, purTypeTrue } from "../constants/anyVariables";

function ListingPage() {
  // check purType & search state
  const check = window.location.pathname.includes("/nha-dat-ban");
  const { state } = useLocation();
  const search = state?.fullData;

  const { data, count, isLoading } = useListingPage(check, search);
  const { queryData, queryCount, isQuerying } = useSearch(search);

  // change page title
  useEffect(() => {
    const pageTitle = check ? purTypeTrue : purTypeFalse;
    document.title = pageTitle;
  }, [check]);

  if (isLoading || isQuerying) {
    return (
      <Center minH="90dvh">
        <Spinner size="md" speed="0.35s" thickness="1px" />
      </Center>
    );
  }

  const listData = search ? queryData : data;
  const listCount = search ? queryCount : count;

  return <List purType={check} data={listData} count={listCount} />;
}

export default ListingPage;
