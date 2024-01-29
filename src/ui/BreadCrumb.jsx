import { BsHouse } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function BreadCrumb ({Hline}){
    return <div className="flex w-full items-center border-b bg-white pb-5 pt-[20px] dark:bg-dark">
    <div className="flex w-full items-center justify-between  ">
      <div className="ml-5 flex items-center gap-2">
        <Link to="/" className="dark:text-light">
          <BsHouse />
        </Link>
        <IoIosArrowForward />
        <Link to="/tin-tuc" className="pt-[3px]">
          <h1 className="font-semibold">Tin tức</h1>
        </Link>
        {Hline && <IoIosArrowForward /> }
        <h1 className="font-semibold">{Hline}</h1>
      </div>
    </div>
  </div>
    
}


export default BreadCrumb