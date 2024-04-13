import { BsHouse } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import unidecode from "unidecode";

function BreadCrumb({ base = "Tin tức", Hline }) {
  const link = slugify(unidecode(base));
  return (
    <div className="flex w-full items-center border-b bg-light py-5 text-xs dark:bg-dark">
      <div className="flex w-full items-center justify-between">
        <div className="ml-5 flex items-center gap-2">
          <NavLink
            to="/"
            className="transition-colors duration-300 hover:text-secondary dark:text-light"
          >
            <BsHouse />
          </NavLink>
          <IoIosArrowForward />
          <NavLink to={`/${link}`}>
            <h1 className="line-clamp-1 font-semibold transition-colors duration-300 hover:text-secondary">
              {base}
            </h1>
          </NavLink>
          {Hline && <IoIosArrowForward />}
          <h1 className="line-clamp-1 font-semibold">{Hline}</h1>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
