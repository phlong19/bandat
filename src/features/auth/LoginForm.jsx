import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Spinner,
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
import Logo from "../../ui/Logo";
import { Link } from "react-router-dom";
import { checkInputType } from "../../utils/helper";

function LoginForm() {
  const accent = useColorModeValue("primary", "secondary");
  const [showPassword, setShowPassword] = useState(false);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isLoggingIn } = useLogin();

  function onSubmit(data) {
    const check = checkInputType(data?.emailOrPhone);

    if (check == "unknown") {
      // TODO
      return setError("emailOrPhone", {
        type: "required",
        message: "Vui lòng nhập Email hoặc số điện thoại",
      });
    } else {
      login(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex
        mx="auto"
        w="full"
        maxW={{ base: "full", sm: "75%", md: "70%", lg: "50%", xl: "600px" }}
        align={"center"}
        justify={"center"}
        rounded="md"
        bg={useColorModeValue("gray.50", "darker")}
      >
        <Stack spacing={6} py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Đăng nhập
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Để trải nghiệm mọi dịch vụ của LandHub ✌️
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
                label="Email / SĐT"
                errors={errors}
                hookForm={{
                  ...register("emailOrPhone", {
                    required: "Cần nhập Email hoặc SĐT",
                  }),
                }}
                id="emailOrPhone"
              />

              <FormInput
                label="Mật khẩu"
                errors={errors}
                hookForm={{
                  ...register("password", {
                    required: "Cần nhập mật khẩu",
                    minLength: {
                      message: "Mật khẩu ít nhất 8 kí tự",
                      value: 8,
                    },
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
                spinner={
                  <Spinner
                    _dark={{ color: "var(--chakra-colors-dark)!important" }}
                    _light={{ color: "var(--chakra-colors-white)!important" }}
                    size="sm"
                  />
                }
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
