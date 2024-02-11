import {
  Flex,
  Button,
  Card,
  CardHeader,
  CardBody,
  Text,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
} from "@chakra-ui/react";

import ChakraTablePagination from "../../ui/ChakraTablePagination";
import NewsFormModal from "../form/NewsFormModal";

function ChakraTable({ title, captions, data, render }) {
  const modeBaseColor = useColorModeValue("primary", "secondary");
  const tableMode = useColorModeValue("light", "#afafaf1c");

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} bg={tableMode}>
      <CardHeader pt="25" pl="25">
        <Flex justify="space-between">
          <Text fontSize="xl" color={modeBaseColor} fontWeight="bold">
            {title}
          </Text>
          <Flex gap={2}>
            <Button colorScheme="teal" variant="ghost">
              here{" "}
            </Button>
            <Button colorScheme="blue" variant="solid">
              some
            </Button>
            <NewsFormModal />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple">
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, i) => {
                return (
                  <Th color="gray.400" key={i} ps={i === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>{data.map(render)}</Tbody>
        </Table>
      </CardBody>
      <ChakraTablePagination />
    </Card>
  );
}

export default ChakraTable;
