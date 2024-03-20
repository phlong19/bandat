import { useState } from "react";
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import FormInput from "../../ui/FormInput";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
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
        bg={useColorModeValue("gray.50", "darker")}
      >
        <Stack py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              dat moi mat khau
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "dark")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} w="full">
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
                w={{ base: "full", sm: "150px" }}
                mx="auto"
                // isLoading={isLoggingIn}
                loadingText="Đợi xíu"
                colorScheme="green"
                type="submit"
              >
                dat lai mk
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

export default ResetPassword;
