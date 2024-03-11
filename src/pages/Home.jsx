import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";

import VideoBackgroundWithSearch from "../ui/VideoBackgroundWithSearch";

function Home() {
  return (
    <Box>
      <VideoBackgroundWithSearch />
      {/* stats */}
      <Center bg="red.400" minH={300}>
        number of customers, re post, partner,..
      </Center>
      <Center bg="blue.600" minH={400}>
        benefits
      </Center>
      <Center>
        <Box as="section" bg="bg.surface">
          <Container py={{ base: "16", md: "24" }}>
            <Stack spacing={{ base: "8", md: "10" }}>
              <Stack spacing={{ base: "4", md: "5" }} align="center">
                <Heading size={{ base: "sm", md: "md" }}>
                  Ready to Grow?
                </Heading>
                <Text
                  color="fg.muted"
                  maxW="2xl"
                  textAlign="center"
                  fontSize="xl"
                >
                  With this beautiful and responsive React components you will
                  realize your next project in no time.
                </Text>
              </Stack>
              <Stack
                spacing="3"
                direction={{ base: "column", sm: "row" }}
                justify="center" align='center' alignSelf='center'
              >
                <Button variant='outline'>
                  Learn more
                </Button>
                <Button colorScheme="green">dang ky ngay</Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Center>
    </Box>
  );
}

export default Home;
