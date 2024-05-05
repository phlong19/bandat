import { Link } from "react-router-dom";
import { MenuList, MenuItem } from "@chakra-ui/react";
import ChakraMenuItemDialog from "../../ui/ChakraMenuItemDialog";

import { PiDownload, PiUpload } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEyeCheck } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import {
  ADMIN_LEVEL,
  DEFAULT_RE_STATUS,
  SELLING_STATUS,
  SOLD_STATUS,
} from "../../constants/anyVariables";

import { useMarkSold } from "./useMarkSold";
import { useApprovePost } from "./useApprovePost";
import { useDeactivePost } from "./useDeactivePost";
import { useDeletePost } from "./useDeletePost";

function MenuActionRE({
  userID,
  authorID,
  statusID,
  postID,
  slug,
  level,
  purType,
}) {
  const { approve } = useApprovePost();
  const { markSold } = useMarkSold();
  const { deactive } = useDeactivePost();
  const { deletePost } = useDeletePost();

  return (
    <MenuList fontSize="medium">
      {/* only admin can approve post */}
      {level >= ADMIN_LEVEL && statusID === DEFAULT_RE_STATUS && (
        <ChakraMenuItemDialog
          color="blue.600"
          action="Duyệt bài nhanh"
          icon={<PiUpload />}
          onAction={() => approve(postID)}
        />
      )}
      {/* must be admin or author to mark sold */}
      {(level >= ADMIN_LEVEL || userID === authorID) &&
        statusID === SELLING_STATUS && (
          <ChakraMenuItemDialog
            color="blue.600"
            action={`Đánh dấu đã ${purType ? "bán" : "thuê"}`}
            icon={<LiaMoneyBillWaveSolid />}
            onAction={() => markSold(postID)}
          />
        )}
      {/* must be admin or author to de-active post */}
      {(level >= ADMIN_LEVEL || userID === authorID) &&
        statusID === SELLING_STATUS && (
          <ChakraMenuItemDialog
            color="red.600"
            action="Gỡ bài viết"
            icon={<PiDownload />}
            onAction={() => deactive(postID)}
            warning
          />
        )}
      <MenuItem
        gap={3}
        color="green"
        as={Link}
        to={`/quan-ly-bai-viet/${slug}`}
      >
        <TbEyeCheck fontSize="20" />
        Xem {statusID !== SOLD_STATUS ? "/ Sửa" : ""}
      </MenuItem>
      {(level >= ADMIN_LEVEL || userID === authorID) && (
        <ChakraMenuItemDialog
          color="red"
          action="Xóa"
          icon={<HiOutlineTrash />}
          onAction={() => deletePost(postID, level, userID)}
          warning
        />
      )}
    </MenuList>
  );
}

export default MenuActionRE;
