import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Center, Spinner } from "@chakra-ui/react";

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

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner size="lg" thickness="4px" />
      </Center>
    );
  }

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
        <NewsFormModal
          editData={newData}
          edit={Boolean(slug)}
          isOpen={isOpen || Boolean(slug)}
          onOpen={onOpen}
          onClose={onClose}
          setSlug={setSlug}
        />
      }
      title="Quản lý tin tức"
      count={count}
    />
  );
}

export default EditorDashboardTable;
