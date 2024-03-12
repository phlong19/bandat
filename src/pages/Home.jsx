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
import Feature from "../ui/Feature";

import {
  IoLogoBitcoin,
  IoSearchSharp,
  IoAnalyticsSharp,
} from "react-icons/io5";
import Testimonials from "../ui/Testimonials";

function Home() {
  return (
    <Box className="space-y-2">
      <VideoBackgroundWithSearch />
      {/* stats */}
      <Center>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <Heading
            as="h1"
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            What is our company doing?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard title={"We serve"} stat={"50,000 people"} />
            <StatsCard title={"In"} stat={"30 different countries"} />
            <StatsCard title={"Who speak"} stat={"100 different languages"} />
          </SimpleGrid>
        </Box>
      </Center>
      <Center>
        <Container maxW={"5xl"} py={12}>
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
                <Feature
                  icon={
                    <Icon
                      as={IoAnalyticsSharp}
                      color={"yellow.500"}
                      w={5}
                      h={5}
                    />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Business Planning"}
                />
                <Feature
                  icon={
                    <Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"Financial Planning"}
                />
                <Feature
                  icon={
                    <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Market Analysis"}
                />
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
      {/* CTA */}
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
                justify="center"
                align="center"
                alignSelf="center"
              >
                <Button variant="outline">Learn more</Button>
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
