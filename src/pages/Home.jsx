import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  SimpleGrid,
  Heading,
  Flex,
  Image,
  Button,
  useColorModeValue,
  StackDivider,
  Icon,
} from "@chakra-ui/react";

import VideoBackgroundWithSearch from "../ui/VideoBackgroundWithSearch";
import StatsCard from "../ui/StatsCard";
import Features from "../ui/Features";

import {
  IoLogoBitcoin,
  IoSearchSharp,
  IoAnalyticsSharp,
} from "react-icons/io5";
import Testimonials from "../ui/Testimonials";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box py={5}>
      <VideoBackgroundWithSearch />
      <Box mx="auto" maxW="1500px">
        {/* stats */}
        <Center>
          <StatsCard />
        </Center>
        <Center>
          <Container maxW={"5xl"} pb={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack spacing={4}>
                <Text
                  textTransform={"uppercase"}
                  color={"blue.400"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={useColorModeValue("blue.50", "blue.900")}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  Our Story
                </Text>
                <Heading>A digital Product design agency</Heading>
                <Text color={"gray.500"} fontSize={"lg"}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Stack
                  spacing={4}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.100", "gray.700")}
                    />
                  }
                >
                  <Stack direction={"row"} align={"center"}>
                    <Flex
                      w={8}
                      h={8}
                      align={"center"}
                      justify={"center"}
                      rounded={"full"}
                      bg={useColorModeValue("yellow.100", "yellow.900")}
                    >
                      <Icon
                        as={IoAnalyticsSharp}
                        color={"yellow.500"}
                        w={5}
                        h={5}
                      />
                    </Flex>
                    <Text fontWeight={600}>hello</Text>
                  </Stack>
                  <Stack direction={"row"} align={"center"}>
                    <Flex
                      w={8}
                      h={8}
                      align={"center"}
                      justify={"center"}
                      rounded={"full"}
                      bg={useColorModeValue("green.100", "green.900")}
                    >
                      <Icon
                        as={IoLogoBitcoin}
                        color={"green.500"}
                        w={5}
                        h={5}
                      />
                    </Flex>
                    <Text fontWeight={600}>Business Planning</Text>
                  </Stack>

                  <Stack direction={"row"} align={"center"}>
                    <Flex
                      w={8}
                      h={8}
                      align={"center"}
                      justify={"center"}
                      rounded={"full"}
                      bg={useColorModeValue("purple.100", "purple.900")}
                    >
                      <Icon
                        as={IoSearchSharp}
                        color={"purple.500"}
                        w={5}
                        h={5}
                      />
                    </Flex>
                    <Text fontWeight={600}>Market Analysis</Text>
                  </Stack>
                </Stack>
              </Stack>
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"feature image"}
                  src={
                    "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  }
                  objectFit={"cover"}
                />
              </Flex>
            </SimpleGrid>
          </Container>
        </Center>
        {/* tes */}
        <Testimonials />
        {/* app features */}
        <Features />
        {/* CTA */}
        <Center
          bg="url('/cta.png')"
          bgRepeat="no-repeat"
          maxW="1200px"
          mx="auto"
          rounded="lg"
          bgSize="cover"
          color="whiteAlpha.800"
        >
          <Box as="section">
            <Container py={{ base: "12", md: "20" }}>
              <Stack spacing={{ base: "8", md: "10" }}>
                <Stack spacing={{ base: "4", md: "5" }} align="center">
                  <Heading size={{ base: "sm", md: "md" }}>
                    Ready to Grow?
                  </Heading>
                  <Text maxW="2xl" textAlign="center" fontSize="xl">
                    With this beautiful and responsive React components you will
                    realize your next project in no time.
                  </Text>
                </Stack>
                <Stack
                  spacing="3"
                  direction={{ base: "column", sm: "row" }}
                  justify="center"
                  align="center"
                  alignSelf="center"
                >
                  <Button
                    borderColor="light"
                    color="light"
                    variant="outline"
                    _hover={{ bg: "whiteAlpha.300" }}
                  >
                    Learn more
                  </Button>
                  <Button colorScheme="green" as={Link} to="/dang-ky">
                    Đăng ký ngay
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default Home;
