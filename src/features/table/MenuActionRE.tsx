import { Link } from "react-router-dom";
import { MenuList, MenuItem } from "@chakra-ui/react";
import ChakraMenuItemDialog from "../../ui/ChakraMenuItemDialog";

import { HiOutlineTrash } from "react-icons/hi";
import {
  TbBox,
  TbBoxAlignTopRight,
  TbBoxOff,
  TbDownloadOff,
  TbEyeCheck,
} from "react-icons/tb";
import {
  ADMIN_LEVEL,
  INSTOCK,
  OUT,
  OUT_STOCK,
  TEMP_OUT,
} from "../../constants/anyVariables";

import { useDeletePost } from "./useDeletePost";
import { useUpdateProductStatus } from "./useUpdateProductStatus";

interface Props {
  statusID: number;
  productID: number;
  slug: string;
  level: number;
}

function MenuActionRE({ statusID, productID, slug, level }: Props) {
  const { update } = useUpdateProductStatus();
  const { deletePost } = useDeletePost();

  return (
    <MenuList fontSize="medium">
      {level >= ADMIN_LEVEL && statusID !== OUT && (
        <ChakraMenuItemDialog
          color="orange.500"
          action={`Đánh dấu ngừng nhập`}
          icon={<TbDownloadOff />}
          onAction={() => update({ statusID: OUT, productID })}
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== OUT_STOCK && (
        <ChakraMenuItemDialog
          color="purple.500"
          action={`Đánh dấu hết hàng`}
          icon={<TbBoxOff />}
          onAction={() => update({ statusID: OUT_STOCK, productID })}
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== TEMP_OUT && (
        <ChakraMenuItemDialog
          color="yellow.500"
          action={`Đánh dấu tạm hết`}
          icon={<TbBoxAlignTopRight />}
          onAction={() => update({ statusID: TEMP_OUT, productID })}
        />
      )}

      {level >= ADMIN_LEVEL && statusID !== INSTOCK && (
        <ChakraMenuItemDialog
          color="blue.600"
          action={`Đánh dấu còn hàng`}
          icon={<TbBox />}
          onAction={() => update({ statusID: INSTOCK, productID })}
        />
      )}

      <MenuItem
        gap={3}
        color="green"
        as={Link}
        to={`/quan-ly-san-pham/${slug}`}
      >
        <TbEyeCheck fontSize="20" />
        Xem / Sửa
      </MenuItem>
      {level >= ADMIN_LEVEL && (
        <ChakraMenuItemDialog
          color="red"
          action="Xóa"
          icon={<HiOutlineTrash />}
          onAction={() => deletePost({ productID })}
          warning
        />
      )}
    </MenuList>
  );
}

export default MenuActionRE;
