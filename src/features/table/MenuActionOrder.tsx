import { MenuItem, MenuList } from "@chakra-ui/react";
import { ADMIN_LEVEL, CANCEL, COMPLETED } from "../../constants/anyVariables";
import ChakraMenuItemDialog from "../../ui/ChakraMenuItemDialog";
import { TbEyeCheck, TbNewsOff } from "react-icons/tb";

import { HiOutlineTrash } from "react-icons/hi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateOrderStatus,
  deleteOrder as deleteOrderAPI,
} from "../../services/apiOrder";
import toast from "react-hot-toast";

interface Props {
  level: number;
  statusID: number;
  orderID: number;
  onClick: () => void;
}

function MenuActionOrder({ level, statusID, orderID, onClick }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: { statusID: number; orderID: number }) =>
      updateOrderStatus(data),
    onSuccess: (data) => {
      toast.success(`Đơn hàng #${data[0].id} đã được cập nhật trạng thái.`);
      queryClient.invalidateQueries({ queryKey: ["order-admin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: deleteOrder } = useMutation({
    mutationFn: (data: { orderID: number }) => deleteOrderAPI(data),
    onSuccess: (data) => {
      toast.success(`Đã xóa thành công đơn hàng #${data[0].id}.`);
      queryClient.invalidateQueries({ queryKey: ["order-admin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <MenuList fontSize="medium">
      {level >= ADMIN_LEVEL &&
        statusID !== CANCEL &&
        statusID !== COMPLETED && (
          <ChakraMenuItemDialog
            color="orange.500"
            action={`Hủy đơn`}
            icon={<TbNewsOff />}
            onAction={() => mutate({ orderID, statusID: CANCEL })}
          />
        )}
      {level >= ADMIN_LEVEL && statusID !== COMPLETED && (
        <ChakraMenuItemDialog
          color="blue.500"
          action={`Đánh dấu hoàn thành`}
          icon={<LiaMoneyBillWaveSolid />}
          onAction={() => mutate({ orderID, statusID: COMPLETED })}
        />
      )}

      <MenuItem gap={3} color="green" onClick={onClick}>
        <TbEyeCheck fontSize="20" />
        Xem chi tiết
      </MenuItem>
      {level >= ADMIN_LEVEL && (
        <ChakraMenuItemDialog
          color="red"
          action="Xóa đơn"
          icon={<HiOutlineTrash />}
          onAction={() => deleteOrder({ orderID })}
          warning
        />
      )}
    </MenuList>
  );
}

export default MenuActionOrder;
