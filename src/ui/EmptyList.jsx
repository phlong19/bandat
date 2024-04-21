import {
  Center,
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbFilterCog } from "react-icons/tb";
import { display } from "../constants/message";

function EmptyList() {
  return (
    <Center minH="70dvh">
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={"yellow.500"}
            rounded={"50px"}
            w={"55px"}
            h={"55px"}
            textAlign="center"
          >
            <Icon fontSize={26} color={"white"} as={TbFilterCog} />
          </Flex>
        </Box>
        <Heading as="h2" size="lg" mt={3} mb={2}>
          {display.emptyList}
        </Heading>
        <Text color={useColorModeValue("gray.500", "gray.300")}>
          {display.emptyHintMessage}
        </Text>
      </Box>
    </Center>
  );
}

export default EmptyList;
