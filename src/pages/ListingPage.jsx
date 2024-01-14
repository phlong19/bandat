import List from "../features/list/List";

function ListingPage({ title = "sell" }) {
  return (
    <div>
      <List />
      <h3 className="font-sanss">test font sans</h3>
      <h3 >test font roboto</h3>
      <h3 className="font-lexend">test font co chu t hinh thanh gia</h3>
      <h3 className="font-montserrat">test font khac</h3>
      <h3 className="font-playfair">test font nhin co dien</h3>
    </div>
  );
}

export default ListingPage;
