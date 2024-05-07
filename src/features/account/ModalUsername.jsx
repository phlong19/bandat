import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { PiIdentificationBadgeLight } from "react-icons/pi";
import { useUpdateUsername } from "./useUpdateUsername";
import { useForm } from "react-hook-form";
import { maxName, minName } from "../../constants/anyVariables";
import { account } from "../../constants/message";
import toast from "react-hot-toast";

function ModalUsername({ color, name, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isPending } = useUpdateUsername();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (!data.fullName) {
      return toast.error("Vui lòng nhập tên người dùng");
    }
    mutate(
      { ...data, userID: id },
      {
        onSettled: () => {
          onClose();
          reset();
        },
      },
    );
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Tên người dùng
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Tên hiển thị trong bài đăng và với người dùng khác.
          </Text>
        </Box>
        <Flex
          w={{ base: "fit-content", sm: "auto" }}
          gap={{ base: 3, md: 4, lg: 5, xl: "5rem" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text fontSize={{ base: "xs", sm: "sm" }}>{name}</Text>
          <Button
            maxW="fit-content"
            ml="auto"
            size="xs"
            fontSize={{ base: "10px", sm: "xs" }}
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<PiIdentificationBadgeLight />}
            onClick={onOpen}
          >
            Sửa tên
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sửa đổi tên người dùng</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="username" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired isInvalid={errors.fullName}>
                <Input
                  placeholder="Nguyen Van A"
                  {...register("fullName", {
                    required: "Không bỏ trống trường này",
                    minLength: {
                      value: minName,
                      message: account.minName,
                    },
                    maxLength: {
                      value: maxName,
                      message: account.maxName,
                    },
                  })}
                />
                {errors.fullName && (
                  <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
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
              type="submit"
              isLoading={isPending}
              form="username"
              mr={3}
              size="sm"
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUsername;
