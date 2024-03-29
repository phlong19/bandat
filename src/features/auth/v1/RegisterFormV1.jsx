import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Flex,
  Spinner,
  Box,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import FormInput from "../../../ui/FormInput";
import Logo from "../../../ui/Logo";

import { useRegisterV1 } from "./useRegisterV1";
import { account } from "../../../constants/message";
import validator from "validator";

function RegisterFormV1() {
  const accent = useColorModeValue("primary", "secondary");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useRegisterV1();

  function onSubmit(data) {
    const check = validator.isStrongPassword(data?.password, {
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    });

    if (check) {
      signup(data);
    } else {
      toast.error("mat khau it nhat 1 viet hoa, 1 ky tu dac biet, 1 so");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
      key={Math.random()}
    >
      <Flex
        mx="auto"
        w="full"
        maxW={{ base: "full", md: "70%", lg: "50%", xl: "600px" }}
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
              Đăng ký
            </Heading>
            <Text
              fontSize={"md"}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              để bắt đầu sử dụng dịch vụ của Landhub ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "dark")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} w="full">
              <HStack flexDirection={{ base: "column", md: "row" }} gap={2.5}>
                <FormInput
                  label="Họ và tên"
                  id="fullName"
                  hookForm={{
                    ...register("fullName", {
                      required: "ten may la gi",
                      minLength: { message: "deo du 8 ky tu", value: 8 },
                    }),
                  }}
                  errors={errors}
                />

                <FormInput
                  label="Email"
                  id="phone"
                  type="email"
                  hookForm={{
                    ...register("email", {
                      required: account.requiredEmail,
                    }),
                  }}
                  errors={errors}
                />
              </HStack>

              <FormInput
                label="Mật khẩu"
                id="password"
                password
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                hookForm={{
                  ...register("password", {
                    required: "nhap cmm mat khau vao",
                    minLength: { message: "kh du 8", value: 8 },
                  }),
                }}
                errors={errors}
              />

              <FormInput
                label="Xác nhận mật khẩu"
                id="confirmPassword"
                password
                setShowPassword={setShowCfPassword}
                showPassword={showCfPassword}
                errors={errors}
                hookForm={{
                  ...register("confirmPassword", {
                    required: "dm kh xac nhan mk ak",
                    minLength: { message: "kh du 8", value: 8 },
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Password does not match"
                      );
                    },
                  }),
                }}
              />

              <Button
                w={{ base: "full", sm: "180px" }}
                mx="auto"
                colorScheme="green"
                spinner={
                  <Spinner
                    _dark={{ color: "var(--chakra-colors-dark)!important" }}
                    _light={{ color: "var(--chakra-colors-white)!important" }}
                    size="sm"
                  />
                }
                isLoading={isLoading}
                loadingText="Chờ xíu"
                type="submit"
              >
                Đăng ký
              </Button>
              <Stack pt={4}>
                <Text align={"center"}>
                  Đã có tài khoản?{" "}
                  <ChakraLink as={Link} color={accent} to="/dang-nhap">
                    Đăng nhập
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

export default RegisterFormV1;
