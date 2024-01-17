import { FaRegHeart } from "react-icons/fa6";

function Bookmark() {
  // FIX ADD BOOKMARK TO LOCAL STORAGE
  return (
    <span className="border border-light px-2.5 py-1.5 dark:border-dark">
      <span className="text-xl">
        <FaRegHeart />
      </span>
    </span>
  );
}

export default Bookmark;
