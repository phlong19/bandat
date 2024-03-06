import { useState } from "react";
import { FaMap, FaRegMap } from "react-icons/fa6";
import { useMapView } from "../context/MapViewContext";

function ViewInMap({ postID, onClick }) {
  const { mapView } = useMapView();
  const [hover, setHover] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }

  return (
    <button
      title="Xem trên map"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      id={`viewInMap${postID}`}
      onClick={handleClick}
      className={`${
        !mapView ? "p-2.5" : "p-1.5"
      } group rounded-md border border-light bg-white dark:border-dark lg:border-0`}
    >
      <span className="text-xl text-black">
        {hover ? <FaMap className="fill-secondary" /> : <FaRegMap />}
      </span>
    </button>
  );
}

export default ViewInMap;
