import { Td, Text, Tr } from "@chakra-ui/react";
import { formatDate } from "../../utils/helper";

function TableReportRow({ data }) {
  const { id, created_at, name } = data;

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

export default TableReportRow;
