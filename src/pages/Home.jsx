import { Link } from "react-router-dom";
import { homeLinks } from "../constants/navlink";
import { products } from "../constants/products";

function Home() {

  return (
    <div className="h-screen bg-light px-4 pt-3 text-dark dark:bg-dark dark:text-light">
      <ul className="flex w-full items-center justify-center gap-3 xl:hidden">
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
        <h2 className="pb-4 pt-6 font-lexend text-xl font-medium">
          Bất động sản dành cho bạn
        </h2>
        {/* homepage list */}
        <div>
          {products.map((product, index) => (
            <div key={index}>
              {/* <ListItem product={product} /> */}
            </div>
          ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Home;
