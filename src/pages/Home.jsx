import { Link } from "react-router-dom";
import { homeLinks } from "../constants/navlink";
import { products } from "../constants/products";
import ListItem from "../features/list/ListItem";
import Searchbar from "../ui/Searchbar";

function Home() {
  return (
    <div className="h-screen bg-light px-4 pt-3 text-dark dark:bg-dark dark:text-light">
      <ul className="flex xl:hidden w-full items-center justify-center gap-3">
        {homeLinks.map((link) => (
          <li
            key={link.title}
            className="h-[85px] w-1/3 rounded-lg border border-light text-center text-base shadow shadow-dark dark:border-dark dark:shadow-light"
          >
            <Link to={link.to}>
              <img src={link.img} alt={link.title} className="mx-auto pb-1.5" />
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* content */}
      <div className="mt-4">
        <h2 className="font-lexend pb-4 pt-6 text-xl font-medium">
          Bất động sản dành cho bạn
        </h2>
        <div>
          {products.map((product, index) => (
            <div key={index}>
              <ListItem product={product} />
            </div>
          ))}
        </div>
      </div>

            <Searchbar />

    </div>
  );
}

export default Home;
