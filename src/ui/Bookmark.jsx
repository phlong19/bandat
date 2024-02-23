import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useMapView } from "../context/MapViewContext";

function Bookmark() {
  const { mapView } = useMapView();
  const [hover, setHover] = useState(false);
  // TODO: ADD BOOKMARK TO LOCAL STORAGE

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
      className={`${!mapView ? "p-2.5" : "p-1.5"} rounded-md bg-light`}
    >
      <span className="text-xl text-black">
        {hover ? <FaHeart className="fill-red-500" /> : <FaRegHeart />}
      </span>
    </button>
  );
}

export default Bookmark;
