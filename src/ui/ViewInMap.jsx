import { useState } from "react";
import { FaMap, FaRegMap } from "react-icons/fa6";
import { toast } from "react-hot-toast";

function ViewInMap({ isMapView }) {
  const [hover, setHover] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toast.error("khong the chi den vi tri chinh xac, vi da lam dau =))");
  }

  return (
    <button
      title="Xem trên map"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={`${
        !isMapView ? "p-2.5" : "p-1.5"
      } group rounded-md border border-light bg-prim-light dark:border-dark dark:bg-sec-light lg:border-0`}
    >
      <span className="text-xl text-black transition-colors duration-300 group-hover:fill-green-600 group-hover:text-green-600">
        {hover ? <FaMap /> : <FaRegMap />}
      </span>
    </button>
  );
}

export default ViewInMap;
