import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { MdOutlineLockReset } from "react-icons/md";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";
import validator from "validator";
import { toast } from "react-hot-toast";

function ModalPassword({ color }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
  } = useForm();
  const { mutate, isPending } = useUpdatePassword();

  function onSubmit(data) {
    if (
      !validator.isStrongPassword(data.password, {
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return toast.error(
        "Mật khẩu không đủ mạnh, ít nhất 1 ký tự đặc biệt, 1 chữ số, 1 chữ in hoa",
      );
    }

    mutate({ ...data });
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Mật khẩu
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Sử dụng cho đăng nhập & xác thực chủ sở hữu tài khoản, vui lòng
            không chia sẻ.
          </Text>
        </Box>
        <Button
        minW='fit-content'
          fontSize={{ base: "10px", sm: "xs" }}
          size="xs"
          fontWeight="400"
          colorScheme="green"
          variant="outline"
          borderWidth={1.5}
          rightIcon={<MdOutlineLockReset />}
          onClick={onOpen}
        >
          Cập nhật
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi mật khẩu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              id="password"
              className="space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <Input
                    fontSize="sm"
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <TbEye /> : <TbEyeClosed />}
                      size="xs"
                      onClick={() => setShowPassword((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <InputGroup>
                  <Input
                    fontSize="sm"
                    placeholder="confirm password"
                    type={showCfPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Vui lòng nhập xác nhận mật khẩu",
                      validate: (value) => {
                        return (
                          value === getValues("password") ||
                          "Mật khẩu không khớp"
                        );
                      },
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showCfPassword ? <TbEye /> : <TbEyeClosed />}
                      size="xs"
                      onClick={() => setShowCfPassword((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              size="sm"
              isLoading={isPending}
              form="password"
              type="submit"
              color="black"
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPassword;
