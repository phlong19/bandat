import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Badge,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormErrorMessage,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useUpdateEmail } from "./useUpdateEmail";

function ModalEmail({ color, email, isConfirmed }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setError,
  } = useForm();

  const { mutate, isPending } = useUpdateEmail();

  function handleClose() {
    onClose();
    reset();
  }

  function onSubmit(data) {
    if (validator.isEmail(data?.email)) {
      console.log(data);
      mutate({ ...data });
    } else {
      setError("email", { type: "validate", message: "email khong hop le" });
    }
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Địa chỉ Email
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Email kết nối với tài khoản.
          </Text>
        </Box>
        <Flex
          w={{ base: "fit-content", sm: "auto" }}
          gap={{ base: 3, md: 4, lg: 5, xl: 20 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box>
            <Text fontSize={{ base: "xs", md: "sm" }}>{email}</Text>
            {isConfirmed ? (
              <Badge
                colorScheme="green"
                p="1px 10px"
                fontSize="10px"
                borderRadius="md"
                textTransform="capitalize"
              >
                đã xác thực
              </Badge>
            ) : (
              <Badge
                colorScheme="red"
                p="1px 10px"
                fontSize="10px"
                borderRadius="md"
                textTransform="capitalize"
              >
                chưa xác thực
              </Badge>
            )}
          </Box>
          <Button
            maxW="fit-content"
            ml="auto"
            size="xs"
            fontSize={{ base: "10px", sm: "xs" }}
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<BiEditAlt />}
            onClick={onOpen}
          >
            Thay đổi
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi địa chỉ email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="email" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <Input
                  type="email"
                  placeholder="nhập Email của bạn"
                  {...register("email", {
                    required: "Không bỏ trống trường này",
                  })}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={handleClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              mr={3}
              isLoading={isPending}
              form="email"
              type="submit"
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEmail;
