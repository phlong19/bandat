import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Flex,
  Box,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import FormInput from "../../ui/FormInput";
import Logo from "../../ui/Logo";

import { useRegister } from "./useRegister";
import { account } from "../../constants/message";
import { phoneLength } from "../../constants/anyVariables";
import validator from "validator";

function RegisterForm({ setPhone, setProgress, setStep }) {
  const accent = useColorModeValue("primary", "secondary");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useRegister(setProgress, setStep);

  function onSubmit(data) {
    const check = validator.isStrongPassword(data?.password, {
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    });

    if (check) {
      setPhone(data.phone);
      signup(data);
    } else {
      return toast.error(
        "Mật khẩu cần ít nhất 1 chữ in hoa, 1 ký tự đặc biệt, và 1 chữ số",
      );
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
              Để bắt đầu sử dụng dịch vụ của LandHub ✌️
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
                      required: "Cần nhập tên đầy đủ",
                      minLength: {
                        message: "Tên đầy đủ cần ít nhất 8 ký tự",
                        value: 8,
                      },
                    }),
                  }}
                  errors={errors}
                />

                <FormInput
                  label="Số điện thoại"
                  id="phone"
                  type="number"
                  hookForm={{
                    ...register("phone", {
                      required: account.requiredPhone,
                      minLength: phoneLength,
                      maxLength: phoneLength,
                      valueAsNumber: true,
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
                    required: "Cần nhập mật khẩu",
                    minLength: {
                      message: "Mật khẩu cần ít nhất 8 ký tự",
                      value: 8,
                    },
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
                    required: "Nhập lại mật khẩu",
                    minLength: {
                      message: "Mật khẩu cần ít nhất 8 ký tự",
                      value: 8,
                    },
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Mật khẩu nhập lại không khớp"
                      );
                    },
                  }),
                }}
              />

              <Button
                w={{ base: "full", sm: "180px" }}
                mx="auto"
                colorScheme="green"
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

export default RegisterForm;
