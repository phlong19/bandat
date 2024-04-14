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
          <Flex
            gap={3}
            justify="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              bg={bg}
              w="full"
              align="start"
              maxW={800}
              minH={400}
              justify="start"
            >
              {data.map((item) => (
                <Box key={item.id} py={2}>
                  <Flex gap={3} w="full" mx="auto">
                    <Avatar src={item.avatar} name={item.fullName} />
                    <Text>{item.fullName}</Text>
                  </Flex>
                </Box>
              ))}
              <div className="flex self-center">
                <ChakraTablePagination count={count} />
              </div>
            </VStack>
            <Box bg={bg} minH={300} w={{ base: "full", lg: 400 }}>
              list
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
}

export default Contacts;
