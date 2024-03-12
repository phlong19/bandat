import { useState } from "react";
import { toast } from "react-hot-toast";
import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

function Bookmark() {
  const [hover, setHover] = useState(false);
  // TODO: ADD BOOKMARK TO LOCAL STORAGE

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toast.error("khong the add vao bookmark, vi da lam dau =))");
  }

  return (
    <IconButton
      bg="light"
      color="darker"
      size="sm"
      _hover="none"
      title="Lưu vào tin của bạn"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {hover ? <FaHeart className="fill-red-500" /> : <FaRegHeart />}
    </IconButton>
  );
}

export default Bookmark;
