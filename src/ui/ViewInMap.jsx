import { useState } from "react";
import { FaMap, FaRegMap } from "react-icons/fa6";

function ViewInMap({ onClick }) {
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
      onClick={handleClick}
      className="rounded-md border border-light bg-white p-1.5 dark:border-dark lg:border-0"
    >
      <span className="text-xl text-black">
        {hover ? <FaMap className="fill-secondary" /> : <FaRegMap />}
      </span>
    </button>
  );
}

export default ViewInMap;
