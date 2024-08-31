import { Box, Heading, Center, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Center minH="100dvh">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, primary, secondary)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Trang không tồn tại
        </Text>
        <Text color={"gray.500"} mb={6}>
          Trang bạn đang tìm kiếm không tồn tại trên website này.
        </Text>

        <Button
          _hover={{ opacity: 0.87 }}
          bgGradient="linear(to-r, primary, secondary)"
          color="white"
          variant="solid"
          as={Link}
          to="/"
        >
          Về trang chủ
        </Button>
      </Box>
    </Center>
  );
}

export default NotFound;
