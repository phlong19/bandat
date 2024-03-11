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
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <Button
          _hover={{ opacity: 0.87 }}
          bgGradient="linear(to-r, primary, secondary)"
          color="white"
          variant="solid"
          as={Link}
          to="/"
        >
          Go to Home
        </Button>
      </Box>
    </Center>
  );
}

export default NotFound;
