import { Tr, Td, Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/helper";

function TableTypeRow({ data }) {
  const { REType_ID: id, created_at, name } = data;

  return (
    <Tr>
      <Td maxW="250px">
        <Text noOfLines={2}>{id}</Text>
      </Td>

      <Td>
        <Text noOfLines={2}>{name}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
    </Tr>
  );
}

export default TableTypeRow;
