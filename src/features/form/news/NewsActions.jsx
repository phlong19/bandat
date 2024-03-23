import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import ChakraFormDialog from "../../../ui/ChakraFormDialog";
import { ADMIN_LEVEL } from "../../../constants/anyVariables";

import { useApproveNews } from "../../table/useApproveNews";
import { useDeactiveNews } from "../../table/useDeactiveNews";
import { useDeleteNews } from "../../table/useDeleteNews";

function NewsActions({ level, id, status, setSlug, userID, authorID }) {
  const queryClient = useQueryClient();

  const { approved, isApproving } = useApproveNews();
  const { deactive, isDeactiving } = useDeactiveNews();
  const { deleted, isDeleting } = useDeleteNews();

  return (
    <Flex gap={2} flexDirection="row-reverse">
      {level >= ADMIN_LEVEL && !status && (
        <ChakraFormDialog
          isLoading={isApproving}
          color="blue.600"
          action="Duyệt bài nhanh"
          onAction={() =>
            approved(id, {
              onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["NewsList"] });
                queryClient.removeQueries({ queryKey: ["SingleNews"] });
                setSlug("");
              },
            })
          }
        />
      )}
      {/* must be admin or author to de-active news */}
      {(level >= ADMIN_LEVEL || userID === authorID) && status && (
        <ChakraFormDialog
          isLoading={isDeactiving}
          color="red.600"
          action="Gỡ bài viết"
          onAction={() =>
            deactive(id, {
              onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["NewsList"] });
                queryClient.removeQueries({ queryKey: ["SingleNews"] });
                setSlug("");
              },
            })
          }
          warning
        />
      )}

      <ChakraFormDialog
        color="red"
        action="Xóa"
        warning
        isLoading={isDeleting}
        onAction={() =>
          deleted(id, level, userID, {
            onSettled: () => {
              queryClient.invalidateQueries({ queryKey: ["NewsList"] });
              queryClient.removeQueries({ queryKey: ["SingleNews"] });
              setSlug("");
            },
          })
        }
      />
    </Flex>
  );
}

export default NewsActions;
