import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  SimpleGrid,
  ModalCloseButton,
  NumberInput,
  VStack,
  NumberInputField,
  useColorMode,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import validator from "validator";

import { list } from "../constants/navlink";
import { createReport } from "../services/apiReport";
import { success } from "../constants/message";
import { useAuth } from "../context/UserContext";

function ReportModal({ isOpen, onClose }) {
  const { data: profile } = useAuth();
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState("");
  const { colorMode } = useColorMode();
  const accent = colorMode
    ? "var(--chakra-colors-primary)"
    : "var(--chakra-colors-secondary)";

  const { mutate } = useMutation({
    mutationFn: (data) => createReport(data),
    onSuccess: () => toast.success(success.createReport),
    onError: (err) => toast.error(err.message),
    onSettled: () => handleClose(),
  });

  // TODO
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  function onSubmit(data) {
    // validation
    const phone = data.phone.toString();
    if (!validator.isEmail(data.email)) {
      return setError("email", {
        type: "validate",
        message: "khong phai email",
      });
    } else if (!validator.isMobilePhone(phone, "vi-VN")) {
      return setError("phone", {
        type: "validate",
        message: "sdt kh phai viet nam",
      });
    }
    console.log({ ...data, userID: profile?.id });
    // mutate({ ...data, userID: profile?.id });
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay zIndex={10000} />
      <ModalContent className="modal-media" boxShadow="dark-lg">
        <ModalHeader fontSize="md" pb={2.5} color={accent}>
          Báo cáo bài tin rao có thông tin không đúng
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id="report"
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <VStack gap={1} align="start">
              {list.map((i, index) => (
                <Checkbox size="sm" key={index} {...register(`${i.value}`)}>
                  {i.label}
                </Checkbox>
              ))}
            </VStack>
            <FormControl>
              <FormLabel fontSize="sm">Phản hồi khác</FormLabel>
              <Textarea {...register("otherReport")} />
            </FormControl>
            <SimpleGrid columns={2} pt={2} gap={2}>
              <FormControl isInvalid={errors.name}>
                <FormLabel fontSize="sm">Họ và tên</FormLabel>
                <Input
                  {...register("name", { required: "dien ho ten" })}
                  size="sm"
                  borderRadius="5px"
                  placeholder="Nguyen Van A"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.phone}>
                <FormLabel fontSize="sm">Số điện thoại</FormLabel>

                <Input
                  size="sm"
                  borderRadius="5px"
                  {...register("phone", {
                    required: "dien sdt",
                  })}
                />

                {errors.phone && (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                placeholder="nguyenvana@gmail.com"
                borderRadius="5px"
                size="sm"
                {...register("email", { required: "dien email" })}
              />
            </FormControl>

            <FormControl isInvalid={errors.description}>
              <FormLabel fontSize="sm">Ghi chú khác</FormLabel>
              <Textarea
                {...register("description", {
                  maxLength: { value: 300, message: "qua dai" },
                })}
              />
            </FormControl>
          </form>
          <Checkbox onChange={() => setCheck((s) => !s)} size="sm" pt={2}>
            Tôi đảm bảo thông tin cung cấp là chính xác
          </Checkbox>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            colorScheme="red"
            size="sm"
            variant="outline"
            onClick={handleClose}
          >
            Đóng
          </Button>
          <Button
            form="report"
            colorScheme="green"
            size="sm"
            isDisabled={!check}
            type="submit"
          >
            Gửi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReportModal;
