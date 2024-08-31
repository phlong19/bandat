import { useLocation, useParams } from "react-router-dom";
import List from "../features/list/List";

import { useListingPage } from "../features/list/useListingPage";
import { useSearch } from "../features/searchbar/useSearch";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import { useGetCategories } from "../hooks/useGetCategories";

function ListingPage() {
  const { categoryTree, isFetching } = useGetCategories();
  const { root, parent, child } = useParams();
  const { state } = useLocation();
  const search = state?.query;
  const { data, count, isLoading } = useListingPage(
    child ?? parent ?? root,
    search,
  );
  const { queryData, queryCount, isQuerying } = useSearch(search);

  if (isFetching) {
    return <SpinnerFullPage />;
  }

  const flatLinks = categoryTree
    ?.reduce((arr: any[], cur) => {
      const obj = { title: cur.title, type: cur.type };
      if (cur.child_links) {
        arr.push(
          cur.child_links.map((child) => {
            const o = { title: child.title, type: child.type };
            return child.child ? [...child.child, o] : o;
          }),
        );
      }

      arr.push(obj);

      return arr;
    }, [])
    .flat(2);

  const labels = [root, parent, child]
    .filter(Boolean)
    .map(
      (type) => type !== null && flatLinks?.find((link) => link.type === type),
    );

  const listData = search ? queryData : data;
  const listCount = search ? queryCount : count;

  return (
    <List
      breadcrumb={labels}
      data={listData}
      count={listCount}
      isLoading={isLoading || isQuerying}
    />
  );
}

export default ListingPage;
