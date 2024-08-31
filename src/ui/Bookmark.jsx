import { useState } from "react";
import { toast } from "react-hot-toast";
import { Tooltip, IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { checkExist, deleteCookie, setCookie } from "../utils/reuse";
import { error, success } from "../constants/message";
import { Helmet } from "react-helmet-async";

function Bookmark({ productID }) {
  const [hover, setHover] = useState(false);
  const check = checkExist(productID);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (check) {
      // delete
      deleteCookie(productID);
      toast.success(success.removedBookmark);
    } else {
      const isAdded = setCookie(productID, 14);
      if (isAdded) {
        toast.success(success.addedBookmark);
      } else {
        toast.error(error.postExist);
      }
    }
  }

  return (
    <>
      <div>
        <Helmet>
          <title>Danh sách sản phẩm yêu thích</title>
        </Helmet>
      </div>
      <Tooltip label="Lưu vào yêu thích" placement="top">
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
    </>
  );
}

export default Bookmark;
