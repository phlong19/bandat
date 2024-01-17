import List from "../features/list/List";

function ListingPage() {
  // check purType
  const check = window.location.pathname.includes("/nha-dat-ban");

  return <List purType={check} />;
}

export default ListingPage;
