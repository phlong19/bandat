import {
  Avatar,
  Box,
  Center,
  Flex,
  VStack,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BreadCrumb from "../ui/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getUsersList } from "../services/apiGeneral";
import { useSearchParams } from "react-router-dom";
import ChakraTablePagination from "../ui/ChakraTablePagination";

function Contacts() {
  const bg = useColorModeValue("white", "darker");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersList(page),
  });
  console.log(data);
  return (
    <Box maxW="1500px" mx="auto" px={3}>
      {isLoading ? (
        <Center minH="50dvh">
          <Spinner />
        </Center>
      ) : (
        <>
          <BreadCrumb base="Danh bạ" />
          <Flex justify="center" flexDirection={{ base: "column", md: "row" }}>
            <VStack w="full"  minH={400} bg={bg} justify="start">
              {data.map((item) => (
                <Box key={item.id} py={2}>
                  <Flex gap={3} align="center" w="full" mx="auto">
                    <Avatar src={item.avatar} name={item.fullName} />
                    <Text>{item.fullName}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
            <Box minH={300} w="60%">
              {" "}
              list
            </Box>
          </Flex>
          <div className="flex justify-center">
            <ChakraTablePagination count={count} />
          </div>
        </>
      )}
    </Box>
  );
}

export default Contacts;
