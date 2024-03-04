import { useState } from "react";
import {
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";

import NewsFormModal from "../form/news/NewsFormModal";
import ChakraTable from "../table/ChakraTable";
import TableNewRow from "../table/TableNewRow";

import { newsCaptions } from "../../constants/anyVariables";
import { useGetSingleNews } from "./useGetSingleNews";

function EditorDashboardTable({ data, count, level }) {
  const [slug, setSlug] = useState("");
  // form modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: newData, isLoading } = useGetSingleNews(slug);

  return (
    <ChakraTable
      data={data}
      captions={newsCaptions}
      render={(item) => (
        <TableNewRow
          data={item}
          level={level}
          key={item.id}
          setSlug={setSlug}
        />
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
          />
        )
      }
      title="Quản lý tin tức"
      count={count}
    />
  );
}

export default EditorDashboardTable;
