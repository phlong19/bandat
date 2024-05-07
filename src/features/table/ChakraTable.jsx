import { Link } from "react-router-dom";
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
  useColorModeValue,
} from "@chakra-ui/react";

import ChakraTablePagination from "../../ui/ChakraTablePagination";
import ChakraTableSort from "../../ui/ChakraTableSort";
import ChakraTableFilter from "../../ui/ChakraTableFilter";
import TextSearch from "./TextSearch";
import EmptyTable from "../../ui/EmptyTable";
import { emptyREList, newsForm } from "../../constants/message";

function ChakraTable({
  title,
  captions,
  data,
  render,
  primaryButton,
  count,
  news = false,
  profile = true,
  viewOnly = false,
  re = false,
  isLoading,
  page,
  setQuery,
}) {
  const modeBaseColor = useColorModeValue("primary", "secondary");
  const tableMode = useColorModeValue("light", "#afafaf1c");

  return (
    <Card
      overflowX={{ sm: "auto", xl: "hidden" }}
      bg={tableMode}
      w={viewOnly ? "100%" : "auto"}
    >
      <CardHeader pt="25" pl="25">
        <Flex justify="space-between" align="center">
          <Text
            fontSize={{ base: "md", lg: "xl" }}
            color={modeBaseColor}
            fontWeight="600"
            fontFamily="roboto"
            noOfLines={1}
            title={title}
          >
            {title}
          </Text>
          <Flex
            gap={2}
            align="center"
            flexDirection={{ base: "column", lg: "row" }}
            minW={{ sm: "50%", lg: "60%" }}
          >
            {profile && (
              <TextSearch
                setQuery={setQuery}
                viewOnly={viewOnly}
                profile={profile}
              />
            )}
            {!viewOnly && (
              <>
                {/* side actions */}
                <ChakraTableFilter news={news} />
                <ChakraTableSort news={news} re={re} />
                {/* for main action */}
                {/* with post => link to dang-tin */}
                {/* news / user + profile / docs => modal */}
                {primaryButton}
              </>
            )}
          </Flex>
        </Flex>
      </CardHeader>
      {isLoading ? (
        <Center minH="80dvh">
          <Spinner />
        </Center>
      ) : (
        <>
          <CardBody
            minH={count > 0 ? "" : "50dvh"}
            maxH={viewOnly ? "50dvh" : ""}
            overflowY="auto"
          >
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
            {count < 1 &&
              (re ? (
                <EmptyTable message={news ? newsForm.empty : emptyREList}>
                  {!news && (
                    <Link to="/dang-tin">
                      <Button colorScheme="green" variant="solid">
                        Tạo bài đăng
                      </Button>
                    </Link>
                  )}
                </EmptyTable>
              ) : (
                <EmptyTable message="Hãy thử thay đổi bộ lọc, từ khóa tìm kiếm" />
              ))}
          </CardBody>
          {count > 0 && (
            <ChakraTablePagination
              count={count}
              page={viewOnly ? page : "page"}
            />
          )}
        </>
      )}
    </Card>
  );
}

export default ChakraTable;
