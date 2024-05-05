import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";

function ResetPassword() {
  return (
    <Flex
      mx="auto"
      w="full"
      maxW={{ base: "full", md: "70%", lg: "50%", xl: "800px" }}
      align={"center"}
      justify={"center"}
      rounded="md"
      bg={useColorModeValue("gray.50", "darker")}
    >
      <Stack py={12} w={{ base: "90%", lg: "85%" }}>
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          rounded={"lg"}
          bg={useColorModeValue("white", "dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Vui lòng kiểm tra email
            </Heading>
            <Text
              textAlign="center"
              fontSize={"md"}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Chỉ còn 1 bước cuối, nhấn vào đường dẫn được gửi đến email
            </Text>
          </Stack>

          <Stack spacing={4} w="full">
            <Button
              w={{ base: "full", sm: "150px" }}
              mx="auto"
              as={Link}
              to="/"
              loadingText="Đợi xíu"
              colorScheme="green"
              leftIcon={<HiHome color={useColorModeValue("white", "darker")} />}
            >
              Về trang chủ
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ResetPassword;
