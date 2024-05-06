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
import { motion } from "framer-motion";
import { TbCheck } from "react-icons/tb";

// test
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i + 1,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

const container = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemChildren = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1,
    },
  },
};

function Features() {
  const color = useColorModeValue("gray.600", "gray.400");
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"} mt={3}>
          mng cho ý kiến chỗ này là cái gì với 🥺
        </Heading>
        <Text color={color} fontSize={"xl"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={10}
          as={motion.div}
          variants={container}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          {features.map((feature) => (
            <HStack
              key={feature.id}
              align={"top"}
              as={motion.div}
              variants={itemChildren}
            >
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
      </Container>
    </Box>
  );
}

export default Features;
