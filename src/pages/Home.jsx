import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Searchbar from "../features/searchbar/Searchbar";

import { homeLinks } from "../constants/navlink";

function Home() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div className="bg-light px-1 pt-3 text-dark dark:bg-dark dark:text-light lg:mt-[72px] lg:min-h-[calc(100vh-72px)]">
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

      <div className="mt-4">
        {isDesktop && <Searchbar />}
        <h2 className="pb-4 pt-6 font-lexend text-xl font-medium">
          Bất động sản dành cho bạn
        </h2>
        {/* homepage list */}
      </div>
    </div>
  );
}

export default Home;
