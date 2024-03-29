import { BsHouse } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function BreadCrumb({ Hline }) {
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
          <NavLink to="/tin-tuc">
            <h1 className="line-clamp-1 font-semibold transition-colors duration-300 hover:text-secondary">
              Tin tức
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
