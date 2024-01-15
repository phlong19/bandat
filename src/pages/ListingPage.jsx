import List from "../features/list/List";

function ListingPage() {
  const check = window.location.pathname.includes("/nha-dat-ban");

  return <List purType={check} />;
}

export default ListingPage;
