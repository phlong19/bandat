import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useMapView } from "../context/MapViewContext";

function Bookmark() {
  const { mapView } = useMapView();
  const [hover, setHover] = useState(false);
  // FIX ADD BOOKMARK TO LOCAL STORAGE

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toast.error("khong the add vao bookmark, vi da lam dau =))");
  }

  return (
    <button
      title="Lưu vào tin của bạn"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={`${
        !mapView ? "p-2.5" : "p-1.5"
      } group rounded-md border border-light bg-prim-light dark:border-dark dark:bg-sec-light lg:border-0`}
    >
      <span className="text-xl text-black transition-colors duration-300 group-hover:fill-red-500 group-hover:text-red-500">
        {hover ? <FaHeart /> : <FaRegHeart />}
      </span>
    </button>
  );
}

export default Bookmark;
