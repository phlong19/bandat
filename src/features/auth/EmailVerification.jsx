import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import FormInput from "../../ui/FormInput";
import Logo from "../../ui/Logo";
import { useEmailConfirm } from "./useEmailConfirm";
import validator from "validator";

function EmailVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendEmail, isSending } = useEmailConfirm();

  async function onSubmit(data) {
    console.log(data);
    if (validator.isEmail(data?.email)) {
      sendEmail(data.email);
    }
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
        <Stack spacing={6} py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Xác thực email
            </Heading>
            <Text
              fontSize={"md"}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Bước cuối cùng! Vui lòng nhập email của bạn
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
                    required: "Chưa nhập email",
                  }),
                }}
                id="email"
                type="email"
              />

              <Button
                w={{ base: "full", sm: "150px" }}
                mx="auto"
                isLoading={isSending}
                loadingText="Đợi xíu"
                colorScheme="green"
                type="submit"
              >
                Gửi mã xác nhận
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

export default EmailVerification;
