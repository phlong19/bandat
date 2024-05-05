import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
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
import { success } from "../../constants/message";

import FormInput from "../../ui/FormInput";
import Logo from "../../ui/Logo";
import { sendMagicLink } from "../../services/apiAuth";
import validator from "validator";

export default function LoginMagicLink() {
  const accent = useColorModeValue("primary", "secondary");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (email) => sendMagicLink(email),
    onSuccess: () => toast.success(success.emailVerify),
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    if (validator.isEmail(data?.email)) {
      mutate(data.email);
    }
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
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Đăng nhập bằng email
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
                isLoading={isPending}
                loadingText="Đợi xíu"
                colorScheme="green"
                type="submit"
              >
                Gửi link
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
