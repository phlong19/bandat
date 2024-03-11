import { Link } from "react-router-dom";
import { homeLinks } from "../constants/navlink";
import HomePageList from "../features/list/HomePageList";
import Searchbar from "../features/list/Searchbar";

function Home() {
  return (
    <div className="lg:mt-[72px] lg:min-h-[calc(100vh-72px)] bg-light px-1 pt-3 text-dark dark:bg-dark dark:text-light">
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
        <Searchbar />
        {/* homepage list */}
        <HomePageList />
      </div>

      
    </div>
  );
}

export default Home;
