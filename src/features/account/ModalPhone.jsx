import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Box,
  Spinner,
  Heading,
  FormControl,
  Text,
  Flex,
  Badge,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Icon,
  IconButton,
  Button,
  Modal,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdOutlineAddIcCall } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { TbCheck } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";

import { phoneLength } from "../../constants/anyVariables";
import { checkPhone } from "../../services/apiAccount";
import { useUpdatePhone } from "./useUpdatePhone";

function ModalPhone({ phone, isConfirmed, color, id }) {
  let invalid;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["query-phone", debouncedSearch],
    queryFn: () => checkPhone(debouncedSearch),
    enabled: search.length >= phoneLength,
  });

  const { mutate, isPending } = useUpdatePhone();

  function handleClose() {
    reset();
    setSearch("");
    onClose();
  }

  async function onSubmit(formData) {
    if (formData?.phone.toString().length !== phoneLength) {
      return toast.error("Không đúng số điện thoại Việt Nam");
    }
    mutate(
      { ...formData, userID: id },
      {
        onSettled: () => handleClose(),
      },
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= phoneLength) {
        setDebouncedSearch(search.toString());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (!isLoading && data?.id) {
    invalid = true;
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Số điện thoại
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Số máy liên lạc, hiển thị trên bài đăng.
          </Text>
        </Box>

        <Flex
          gap={{ base: 3, md: 4, lg: 5, xl: 20 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box>
            {phone ? (
              <>
                <Text>0{phone}</Text>
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
              </>
            ) : (
              "---"
            )}
          </Box>

          <Button
            size="xs"
            fontSize={{ base: "10px", sm: "xs" }}
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<MdOutlineAddIcCall />}
            onClick={onOpen}
          >
            Đổi số
          </Button>
        </Flex>
      </Flex>

      <Modal isCentered isOpen={isOpen} onClose={handleClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thay đổi số điện thoại</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)} id="phone">
              <FormControl isInvalid={invalid || errors.phone}>
                <InputGroup>
                  <Input
                    {...register("phone", {
                      required: "Không bỏ trống trường này",
                    })}
                    onChange={(e) => {
                      invalid = false;
                      setSearch(e.target.value);
                    }}
                    type="number"
                    value={search}
                  />
                  <InputRightElement gap={3} mr={3}>
                    {isLoading ? (
                      <Spinner size="xs" boxSize={2} thickness="1px" />
                    ) : (
                      <Icon
                        color={!invalid ? "primary" : "red"}
                        as={!invalid ? TbCheck : HiXMark}
                      />
                    )}
                    <IconButton
                      size="sm"
                      icon={<AiOutlineClear />}
                      onClick={() => {
                        reset();
                        setSearch("");
                        setValue("phone", "");
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.phone && (
                  <FormErrorMessage ml={1} fontSize="xs">
                    {errors.phone.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={handleClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              form="phone"
              colorScheme="green"
              mr={3}
              isDisabled={invalid}
              isLoading={isPending}
              type="submit"
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

export default ModalPhone;
