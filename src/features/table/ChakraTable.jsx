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
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import ChakraTablePagination from "../../ui/ChakraTablePagination";
import { BiSearchAlt } from "react-icons/bi";
import { newsForm } from "../../constants/message";

function ChakraTable({
  title,
  captions,
  data,
  render,
  primaryButton,
  count,
  news = false,
}) {
  const modeBaseColor = useColorModeValue("primary", "secondary");
  const tableMode = useColorModeValue("light", "#afafaf1c");

  return (
    <Card overflowX={{ sm: "auto", xl: "hidden" }} bg={tableMode}>
      <CardHeader pt="25" pl="25">
        <Flex justify="space-between">
          <Text
            fontSize="xl"
            color={modeBaseColor}
            fontWeight="600"
            fontFamily="roboto"
          >
            {title}
          </Text>
          <Flex gap={2}>
            {/* side actions */}
            {/* TODO: */}
            <InputGroup>
              <Input placeholder="search" />
              <InputRightElement>
                <Button p={0}>
                  <BiSearchAlt />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme="teal" variant="ghost">
              filter
            </Button>
            <Button colorScheme="blue" variant="ghost">
              sort
            </Button>
            {/* for main action */}
            {/* with post => link to dang-tin */}
            {/* news / user + profile / docs => modal */}
            {primaryButton}
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple">
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, i) => {
                return (
                  <Th
                    color="gray.400"
                    textTransform="capitalize"
                    fontSize="small"
                    key={i}
                    ps={i === 0 ? "0px" : null}
                  >
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {!news ? data.map(render) : <Text>{newsForm.empty}</Text>}
          </Tbody>
        </Table>
      </CardBody>
      <ChakraTablePagination count={count} />
    </Card>
  );
}

export default ChakraTable;
