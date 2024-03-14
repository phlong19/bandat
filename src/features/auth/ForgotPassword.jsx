import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Link as ChakraLink,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import FormInput from "../../ui/FormInput";

export default function ForgotPassword() {
  const accent = useColorModeValue("primary", "secondary");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex
        mx="auto"
        w="full"
        maxW={{ base: "full", md: "70%", lg: "50%", xl: "800px" }}
        align={"center"}
        justify={"center"}
        rounded="md"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              forgot psw
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} w="full">
              <FormInput
                label="Email"
                errors={errors}
                hookForm={{
                  ...register("email", {
                    required: "nhap email vao",
                    value: "vyj55254@nezid.com",
                  }),
                }}
                id="email"
                type="email"
              />

              <Button
                w={{ base: "full", sm: "150px" }}
                mx="auto"
                // isLoading={isLoggingIn}
                loadingText="Đợi xíu"
                colorScheme="green"
                type="submit"
              >
                Gửi request
              </Button>
              <Stack pt={4}>
                <Text align={"center"}>
                  Chưa có tài khoản?{" "}
                  <ChakraLink as={Link} to="/dang-ky" color={accent}>
                    Đăng ký ngay
                  </ChakraLink>
                </Text>
                <Text align={"center"}>
                  Đã có tài khoản?{" "}
                  <ChakraLink as={Link} color={accent} to="/dang-nhap">
                    Đăng nhập
                  </ChakraLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
