import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ChakraFormDialog from "../../ui/ChakraFormDialog";
import { useApprovePost } from "../table/useApprovePost";
import { useDeactivePost } from "../table/useDeactivePost";
import { useDeletePost } from "../table/useDeletePost";
import { useMarkSold } from "../table/useMarkSold";
import { ADMIN_LEVEL, INSTOCK } from "../../constants/anyVariables";

function FormActions({ level, postID, userID, statusID }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { approve } = useApprovePost();
  const { deactive } = useDeactivePost();
  const { deletePost } = useDeletePost();
  const { markSold } = useMarkSold();

  return (
    <Flex gap={2} flexDirection="row-reverse">
      {level >= ADMIN_LEVEL && statusID === INSTOCK && (
        <ChakraFormDialog
          color="blue.600"
          action="Duyệt bài"
          onAction={() =>
            approve(postID, {
              onSettled: () =>
                queryClient.invalidateQueries({ refetchType: "active" }),
            })
          }
        />
      )}
      {(level >= ADMIN_LEVEL) &&
        statusID === INSTOCK && (
          <ChakraFormDialog
            color="red.600"
            action="Gỡ bài"
            onAction={() =>
              deactive(postID, {
                onSettled: () =>
                  queryClient.invalidateQueries({ refetchType: "active" }),
              })
            }
            warning
          />
        )}

      {(level >= ADMIN_LEVEL) &&
        statusID === INSTOCK && (
          <ChakraFormDialog
            color="blue.600"
            action="Đánh dấu đã bán"
            onAction={() =>
              markSold(postID, {
                onSettled: () =>
                  queryClient.invalidateQueries({ refetchType: "active" }),
              })
            }
          />
        )}

      {(level >= ADMIN_LEVEL) && (
        <ChakraFormDialog
          color="red"
          action="Xóa"
          onAction={() =>
            deletePost(postID, level, userID, {
              onSettled: () => {
                navigate("/quan-ly-san-pham");
                queryClient.invalidateQueries({ queryKey: ["REList"] });
              },
            })
          }
          warning
        />
      )}
    </Flex>
  );
}

export default FormActions;
