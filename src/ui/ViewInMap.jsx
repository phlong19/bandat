import { useState } from "react";
import { LiaMapMarkedAltSolid, LiaMap } from "react-icons/lia";

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
        {hover ? (
          <LiaMapMarkedAltSolid className="fill-secondary stroke-secondary" />
        ) : (
          <LiaMap />
        )}
      </span>
    </button>
  );
}

export default ViewInMap;
