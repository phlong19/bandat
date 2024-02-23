import { Box, Text, Center, useColorModeValue } from "@chakra-ui/react";

function EmptyTable({ message, children }) {
  const bg = useColorModeValue("light", "blackAlpha.400");
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" backgroundColor={bg}>
      <Text
        textAlign="center"
        color="gray.500"
        fontWeight="600"
        fontSize="medium"
        fontFamily="roboto"
      >
        {message}
      </Text>
      <Center mt={3}>{children}</Center>
    </Box>
  );
}

export default EmptyTable;
