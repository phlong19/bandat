import { useState } from "react";
import { toast } from "react-hot-toast";
import { Tooltip, IconButton } from "@chakra-ui/react";
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
    <Tooltip label="Lưu vào tin của bạn" placement="top">
      <IconButton
        bg="light"
        color="darker"
        size="sm"
        variant="unstyled"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
      >
        <span className="flex items-center justify-center">
          {hover ? <FaHeart className="fill-red-500" /> : <FaRegHeart />}
        </span>
      </IconButton>
    </Tooltip>
  );
}

export default Bookmark;
