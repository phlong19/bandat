import { MenuItem, MenuList } from "@chakra-ui/react";
import {
  ADMIN_LEVEL,
  CANCEL,
  WAITING,
  COMPLETED,
} from "../../constants/anyVariables";
import ChakraMenuItemDialog from "../../ui/ChakraMenuItemDialog";
import {
  TbBoxAlignTopRight,
  TbBoxOff,
  TbDownloadOff,
  TbEyeCheck,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

interface Props {
  level: number;
  statusID: number;
  orderID: number;
  userID: string;
}

function MenuActionOrder({ level, statusID, orderID, userID }: Props) {
  return (
    <MenuList fontSize="medium">
      {level >= ADMIN_LEVEL && statusID !== CANCEL && (
        <ChakraMenuItemDialog
          color="orange.500"
          action={`Đánh dấu ngừng nhập`}
          icon={<TbDownloadOff />}
          onAction={() => {}}
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== COMPLETED && (
        <ChakraMenuItemDialog
          color="purple.500"
          action={`Đánh dấu hết hàng`}
          icon={<TbBoxOff />}
          onAction={() => {}}
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== WAITING && (
        <ChakraMenuItemDialog
          color="yellow.500"
          action={`Đánh dấu tạm hết`}
          icon={<TbBoxAlignTopRight />}
          onAction={() => {}}
        />
      )}

      <MenuItem
        gap={3}
        color="green"
        as={Link}
        to={`/quan-ly-san-pham/${orderID}`}
      >
        <TbEyeCheck fontSize="20" />
        Xem / Sửa
      </MenuItem>
      {level >= ADMIN_LEVEL && (
        <ChakraMenuItemDialog
          color="red"
          action="Xóa"
          icon={<HiOutlineTrash />}
          onAction={() => {}}
          warning
        />
      )}
    </MenuList>
  );
}

export default MenuActionOrder;
