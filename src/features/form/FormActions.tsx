import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ChakraFormDialog from "../../ui/ChakraFormDialog";
import { useDeletePost } from "../table/useDeletePost";
import {
  ADMIN_LEVEL,
  INSTOCK,
  OUT,
  OUT_STOCK,
  TEMP_OUT,
} from "../../constants/anyVariables";
import { useUpdateProductStatus } from "../table/useUpdateProductStatus";

interface Props {
  level: number;
  productID: number;
  userID: string;
  statusID: number;
}

function FormActions({ level, productID, userID, statusID }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deletePost } = useDeletePost();
  const { update } = useUpdateProductStatus();

  function onSettled() {
    navigate("/quan-ly-san-pham");
    queryClient.invalidateQueries({ queryKey: ["product-admin"] });
  }

  return (
    <Flex gap={2} flexDirection="row-reverse">
      {level >= ADMIN_LEVEL && statusID !== OUT && (
        <ChakraFormDialog
          color="orange.600"
          action="Ngừng nhập"
          onAction={() => update({ statusID: OUT, productID }, { onSettled })}
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== OUT_STOCK && (
        <ChakraFormDialog
          color="purple.500"
          action="Hết hàng"
          onAction={() =>
            update({ statusID: OUT_STOCK, productID }, { onSettled })
          }
        />
      )}
      {level >= ADMIN_LEVEL && statusID !== TEMP_OUT && (
        <ChakraFormDialog
          color="yellow.500"
          action="Tạm hết"
          onAction={() =>
            update({ statusID: TEMP_OUT, productID }, { onSettled })
          }
        />
      )}

      {level >= ADMIN_LEVEL && statusID !== INSTOCK && (
        <ChakraFormDialog
          color="green.600"
          action="Đánh dấu còn hàng"
          onAction={() =>
            update({ statusID: INSTOCK, productID }, { onSettled })
          }
        />
      )}

      {level >= ADMIN_LEVEL && (
        <ChakraFormDialog
          color="red"
          action="Xóa sản phẩm"
          onAction={() =>
            deletePost(
              { productID },
              {
                onSettled,
              },
            )
          }
          warning
        />
      )}
    </Flex>
  );
}

export default FormActions;
