import { BsHouse } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function BreadCrumb({ Hline }) {
  return (
    <div className="flex w-full items-center border-b bg-white py-5 text-xs dark:bg-dark">
      <div className="flex w-full items-center justify-between">
        <div className="ml-5 flex items-center gap-2">
          <NavLink to="/" className="dark:text-light">
            <BsHouse />
          </NavLink>
          <IoIosArrowForward />
          <NavLink to="/tin-tuc" className="">
            <h1 className="font-semibold">Tin tức</h1>
          </NavLink>
          {Hline && <IoIosArrowForward />}
          <h1 className="font-semibold">{Hline}</h1>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
