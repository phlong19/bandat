import { useState } from "react";
import {
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalBody,
  Box,
  Spinner,
} from "@chakra-ui/react";

import NewsFormModal from "../form/news/NewsFormModal";
import ChakraTable from "../table/ChakraTable";
import TableNewRow from "../table/TableNewRow";
import ChakraBreadcrumb from "../../ui/ChakraBreadcrumb";

import { newsCaptions } from "../../constants/anyVariables";
import { useGetSingleNews } from "./useGetSingleNews";
import { useGetFullNewsList } from "./useGetFullNewsList";

function EditorDashboardTable({ id }) {
  const [slug, setSlug] = useState("");
  // form modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, count, isLoading: isFetching } = useGetFullNewsList(id);
  const { data: newData, isLoading } = useGetSingleNews(slug);

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Quản lý tin tức" />
      <ChakraTable
        isLoading={isLoading || isFetching}
        data={data}
        captions={newsCaptions}
        render={(item) => (
          <TableNewRow data={item} key={item.id} setSlug={setSlug} />
        )}
        primaryButton={
          isLoading ? (
            <Modal size="full">
              <ModalOverlay />
              <ModalBody>
                <Spinner />
              </ModalBody>
            </Modal>
          ) : (
            <NewsFormModal
              editData={newData}
              edit={Boolean(slug)}
              isOpen={isOpen || Boolean(slug)}
              onOpen={onOpen}
              onClose={onClose}
              setSlug={setSlug}
              key={newData?.id || "new"}
            />
          )
        }
        title="Quản lý danh sách tin tức"
        count={count}
        news
      />
    </Box>
  );
}

export default EditorDashboardTable;
