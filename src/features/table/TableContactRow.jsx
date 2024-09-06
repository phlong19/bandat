import { Tr, Td, Text } from "@chakra-ui/react";

import { format } from "date-fns";

function TableContactRow({ data }) {
  const { created_at, name, email, phone, title, content } = data;

  return (
    <Tr>
      <Td pl={0} maxW="250px" title={name}>
        <Text noOfLines={2}>{name}</Text>
      </Td>

      <Td minW={100}>
        <Text noOfLines={2}>{phone.length > 1 ? phone : "---"}</Text>
      </Td>

      <Td title={email} maxW={200}>
        <Text noOfLines={1}>{email}</Text>
      </Td>
      <Td maxW="250px" title={title}>
        <Text noOfLines={2}>{title}</Text>
      </Td>
      <Td minW={250} maxW={250} title={content}>
        <Text noOfLines={2}>{content}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{format(new Date(created_at), 'HH:mm dd/MM/yyyy')}</Text>
      </Td>
    </Tr>
  );
}

export default TableContactRow;
