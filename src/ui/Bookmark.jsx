import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

function Bookmark() {
  const [hover, setHover] = useState(false);
  // FIX ADD BOOKMARK TO LOCAL STORAGE
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        toast.error("khong the add vao bookmark, vi da lam dau =))")
      }
      className="group rounded-md border border-light bg-prim-light px-2.5 py-2.5 dark:border-dark"
    >
      <span className="text-xl text-black transition-colors duration-300 group-hover:fill-red-500 group-hover:text-red-500">
        {hover ? <FaHeart /> : <FaRegHeart />}
      </span>
    </button>
  );
}

export default Bookmark;
