import {
  Flex,
  Button,
  Card,
  CardHeader,
  Spinner,
  CardBody,
  Text,
  Thead,
  Table,
  Tr,
  Center,
  Th,
  Tbody,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { BiSearchAlt } from "react-icons/bi";
import ChakraTablePagination from "../../ui/ChakraTablePagination";
import ChakraTableSort from "../../ui/ChakraTableSort";
import ChakraTableFilter from "../../ui/ChakraTableFilter";
import { emptyREList, newsForm } from "../../constants/message";
import EmptyTable from "../../ui/EmptyTable";
import { Link } from "react-router-dom";

function ChakraTable({
  title,
  captions,
  data,
  render,
  primaryButton,
  count,
  news = false,
  isLoading,
}) {
  const modeBaseColor = useColorModeValue("primary", "secondary");
  const tableMode = useColorModeValue("light", "#afafaf1c");

  return (
    <Card overflowX={{ sm: "auto", xl: "hidden" }} bg={tableMode}>
      <CardHeader pt="25" pl="25">
        <Flex justify="space-between" align="center">
          <Text
            fontSize="xl"
            color={modeBaseColor}
            fontWeight="600"
            fontFamily="roboto"
            noOfLines={1}
            title={title}
          >
            {title}
          </Text>
          <Flex gap={2} align="center">
            {/* side actions */}
            {/* TODO: */}
            {/* a. add text search */}
            {/* b. display suitable empty filter / sort list */}
            <InputGroup>
              <Input placeholder="search" />
              <InputRightElement>
                <Button p={0}>
                  <BiSearchAlt />
                </Button>
              </InputRightElement>
            </InputGroup>
            <ChakraTableFilter news={news} />
            <ChakraTableSort news={news} />
            {/* for main action */}
            {/* with post => link to dang-tin */}
            {/* news / user + profile / docs => modal */}
            {primaryButton}
          </Flex>
        </Flex>
      </CardHeader>
      {isLoading ? (
        <Center minH="80dvh">
          <Spinner />
        </Center>
      ) : (
        <>
          <CardBody minH={count > 0 ? "" : "50dvh"}>
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
                        pr={0}
                      >
                        {caption}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>{count > 0 && data.map(render)}</Tbody>
            </Table>
            {count < 1 && (
              <EmptyTable message={news ? newsForm.empty : emptyREList}>
                {!news && (
                  <Link to="/dang-tin">
                    <Button colorScheme="green" variant="solid">
                      Tạo bài đăng
                    </Button>
                  </Link>
                )}
              </EmptyTable>
            )}
          </CardBody>
          {count > 0 && <ChakraTablePagination count={count} />}
        </>
      )}
    </Card>
  );
}

export default ChakraTable;
