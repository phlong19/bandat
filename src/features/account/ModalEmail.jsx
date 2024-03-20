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
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import validator from "validator";

function ModalEmail({ color, email, isConfirmed, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();

  function handleClose() {
    onClose();
    setValue("");
  }

  function onSubmit(data) {
    if (validator.isEmail(data?.email)) {
      console.log(data);
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
        <Flex gap={20}>
          <Box>
            <Text>{email}</Text>
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
            size="xs"
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi mật khẩu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="email">
              <Input
                type="email"
                placeholder="email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...register("email", { required: "vui long nhap email" })}
              />
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              isLoading={true}
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
