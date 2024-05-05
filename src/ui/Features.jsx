import {
  Stack,
  Box,
  Container,
  SimpleGrid,
  Heading,
  Icon,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbCheck } from "react-icons/tb";

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i + 1,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

function Features() {
  const color = useColorModeValue("gray.600", "gray.400");
  return (
    <Box p={4}>
      {/* <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
       <Heading fontSize={"3xl"} mt={3}>
          cho nay co the list cmn ra tinh nang app luon
        </Heading>
        <Text color={color} fontSize={"xl"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={TbCheck} fontSize="lg" />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title + " " + feature.id}</Text>
                <Text color={color}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container> */}
    </Box>
  );
}

export default Features;
