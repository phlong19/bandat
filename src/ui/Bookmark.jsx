import { useState } from "react";
import { toast } from "react-hot-toast";
import { Tooltip, IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { checkExist, deleteCookie, setCookie } from "../utils/reuse";
import { error, success } from "../constants/message";

function Bookmark({ postID }) {
  const [hover, setHover] = useState(false);
  const check = checkExist(postID);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (check) {
      // delete
      deleteCookie(postID);
      toast.success(success.removedBookmark);
    } else {
      const isAdded = setCookie(postID, 14);
      if (isAdded) {
        toast.success(success.addedBookmark);
      } else {
        toast.error(error.postExist);
      }
    }
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
          {hover || check ? (
            <FaHeart fill="red" className="fill-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </span>
      </IconButton>
    </Tooltip>
  );
}

export default Bookmark;
