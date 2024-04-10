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
  VStack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import validator from "validator";

import { list } from "../constants/navlink";
import { createReport } from "../services/apiReport";
import { success } from "../constants/message";
import { useAuth } from "../context/UserContext";

function ReportModal({ postID, isOpen, onClose }) {
  const { data: profile } = useAuth();
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState("");
  const { colorMode } = useColorMode();
  const accent = colorMode
    ? "var(--chakra-colors-primary)"
    : "var(--chakra-colors-secondary)";

  const { mutate, isPending } = useMutation({
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
    // require at least one box
    if (!isAtLeastOneChecked(data)) {
      return setErr("vui long chon 1 loi hoac dien vao textbox duoi");
    }
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

    mutate({ ...data, userID: profile?.id, postID });
  }

  function handleClose() {
    reset();
    setCheck(false);
    setErr("");
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
                <Checkbox
                  isInvalid={err}
                  size="sm"
                  key={index}
                  {...register(`${i.value}`)}
                  onChange={() => setErr("")}
                >
                  {i.label}
                </Checkbox>
              ))}
            </VStack>
            {err && <Text color="red">{err}</Text>}
            <FormControl isInvalid={err}>
              <FormLabel fontSize="sm">Phản hồi khác</FormLabel>
              <Textarea
                fontSize="sm"
                {...register("otherReport", {
                  maxLength: { value: 300, message: "qua dai" },
                })}
                onChange={() => setErr("")}
              />
            </FormControl>
            <SimpleGrid columns={2} pt={2} gap={2}>
              <FormControl isInvalid={errors.name}>
                <FormLabel fontSize="sm">Họ và tên</FormLabel>
                <Input
                  {...register("name", { required: "dien ho ten" })}
                  size="sm"
                  borderRadius="5px"
                  placeholder="Nguyen Van A" value='phan test final'
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.phone}>
                <FormLabel fontSize="sm">Số điện thoại</FormLabel>

                <Input
                  size="sm" value='0846134872'
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
                value="nguyenvana@gmail.com"
                placeholder="nguyenvana@gmail.com"
                borderRadius="5px"
                size="sm"
                {...register("email", { required: "dien email" })}
              />
            </FormControl>

            <FormControl isInvalid={errors.description}>
              <FormLabel fontSize="sm">Ghi chú khác</FormLabel>
              <Textarea
                fontSize="sm"
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
            isLoading={isPending}
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

function isAtLeastOneChecked(formData) {
  // Iterate through the keys of the formData object
  for (const key in formData) {
    // Check if the value is true (assuming it's a boolean value for the checkboxes)
    if (formData[key] === true || formData.otherReport.length > 0) {
      return true; // At least one checkbox is checked
    }
  }
  return false; // No checkbox is checked
}
