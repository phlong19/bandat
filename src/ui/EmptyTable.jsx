import {
  Box,
  Text,
  Center,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

function EmptyTable({ message, children }) {
  const bg = useColorModeValue("light", "blackAlpha.400");
  return (
    <Box p="4" mt={20} borderWidth="1px" borderRadius="md" backgroundColor={bg}>
      <Box textAlign="center" py={10} pb={2} px={6}>
        <Text fontSize={40}>🤔</Text>
        <Heading as="h2" size="lg" mt={4} mb={2}>
          Không có kết quả nào
        </Heading>
        <Text color={"gray.500"}>{message}</Text>
      </Box>
      <Center mt={3}>{children}</Center>
    </Box>
  );
}

export default EmptyTable;
