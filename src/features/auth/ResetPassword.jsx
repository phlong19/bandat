import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import FormInput from "../../ui/FormInput";
import Logo from "../../ui/Logo";

import { updatePassword } from "../../services/apiAccount";
import { success } from "../../constants/message";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const bg = useColorModeValue("gray.50", "darker");
  const whitedark = useColorModeValue("white", "dark");

  useEffect(() => {
    console.log(location.state === "PASSWORD_RECOVERY");
    if (location.state?.event != "PASSWORD_RECOVERY") {
      toast.error(
        "Vui lòng check email lay link reset password? hoac gui lai 1 yeu cau moi",
        { duration: 6000 },
      );
      // TODO: fix true state but still navigate
      return navigate("/");
    }
  }, [location.state, navigate]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (pass) => updatePassword(pass),
    onSuccess: () => {
      toast.success(success.updatePassword);
      queryClient.setQueryData(["user"], null);
      navigate("/dang-nhap", { replace: true });
      queryClient.invalidateQueries();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data.password);
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
        bg={bg}
      >
        <Stack py={12} w={{ base: "90%", lg: "85%" }}>
          <Stack align={"center"}>
            <Box pb={2}>
              <Logo size="w-40" />
            </Box>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              dat moi mat khau
            </Heading>
          </Stack>
          <Box rounded={"lg"} bg={whitedark} boxShadow={"lg"} p={8}>
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
                isLoading={isPending}
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
