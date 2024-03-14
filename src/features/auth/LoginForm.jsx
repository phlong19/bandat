import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLogin } from "./useLogin";
import FormInput from "../../ui/FormInput";
import { Link } from "react-router-dom";

function LoginForm() {
  const accent = useColorModeValue("primary", "secondary");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { login, isLoggingIn } = useLogin();

  function onSubmit(data) {
    if (!getValues("email") || !getValues("password")) return;
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex
        mx="auto"
        w="full"
        maxW={{ base: "full", md: "70%", lg: "50%", xl: "600px" }}
        align={"center"}
        justify={"center"}
        rounded="md"
        bg={useColorModeValue("gray.50", "darker")}
      >
        <Stack spacing={8} py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "dark")}
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
              <FormInput
                label="Mật khẩu"
                errors={errors}
                hookForm={{
                  ...register("password", {
                    required: "nhap mk vao dcm",
                    value: "123456",
                  }),
                }}
                id="password"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                password
                type="password"
              />

              <Button
                w={{ base: "full", sm: "150px" }}
                mx="auto"
                isLoading={isLoggingIn}
                loadingText="Đợi xíu"
                colorScheme="green"
                type="submit"
              >
                Đăng nhập
              </Button>
              <Stack pt={4}>
                <Text align={"center"}>
                  Chưa có tài khoản?{" "}
                  <ChakraLink as={Link} to="/dang-ky" color={accent}>
                    Đăng ký ngay
                  </ChakraLink>
                </Text>
                <Text align={"center"}>
                  Bạn quên mật khẩu?{" "}
                  <ChakraLink as={Link} color={accent} to="/quen-mat-khau">
                    Trợ giúp
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

export default LoginForm;
