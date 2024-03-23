import { Tr, Td, Text, Menu, MenuList, MenuButton } from "@chakra-ui/react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { formatDate } from "../../utils/helper";

function TableDocRow({ data }) {
  const { doc_id, created_at, doc_name } = data;

  return (
    <Tr className="group">
      {/* title */}
      <Td maxW="250px">
        <Text noOfLines={2}>{doc_id}</Text>
      </Td>
      {/* summary */}
      <Td>
        <Text noOfLines={2}>{doc_name}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuList fontSize="sm">hi</MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableDocRow;
