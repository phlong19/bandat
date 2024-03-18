import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Spinner,
  Heading,
  FormControl,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
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

function ModalPhone({ color, id }) {
  let invalid = false;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["query-phone"],
    queryFn: () => checkPhone(debouncedSearch),
    enabled: search.length >= phoneLength,
  });

  function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= phoneLength) {
        setDebouncedSearch(search);
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

        <Button
          size="xs"
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

      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thay đổi số điện thoại</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isLoading && <Spinner size="xs" />}
            <form onSubmit={handleSubmit(onSubmit)} id="password">
              <FormControl isInvalid={invalid}>
                <InputGroup>
                  <Input
                    {...register("phone", {
                      required: "vui long nhap so dien thoai",
                      minLength: {
                        value: phoneLength,
                        message: "khong phai so dien thoai",
                      },
                    })}
                    onChange={(e) => {
                      invalid = false;
                      setSearch(e.target.value);
                    }}
                  />
                  <InputRightElement gap={3} mr={3}>
                    <Icon
                      color={!invalid ? "primary" : "red"}
                      as={!invalid ? TbCheck : HiXMark}
                    />
                    <IconButton size="sm" icon={<AiOutlineClear />} />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              form="phone"
              colorScheme="green"
              mr={3}
              isDisabled={invalid}
              // isLoading={isPending}
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
