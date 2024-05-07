import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import Avatar from "../../ui/Avatar";
import AvatarDropzone from "./AvatarDropzone";
import { EDITOR_LEVEL } from "../../constants/anyVariables";
import { CgArrowsExchange } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useUpdateAvatar } from "./useUpdateAvatar";

function ModalAvatar({ data, color, level, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
  const { setValue, control, handleSubmit } = useForm();
  const { mutate, isPending } = useUpdateAvatar();

  function handleClose() {
    setValue("files", []);
    setFiles([]);
    onClose();
  }

  function onSubmit(data) {
    if (!data) {
      return false;
    }
    mutate({ userID: id, ...data }, { onSettled: () => handleClose() });
  }

  return (
    <>
      <Box>
        <Heading size="xs" mb={3} textTransform="capitalize">
          Ảnh đại diện
        </Heading>

        <Flex align="center" justify="space-between">
          <Flex gap={3} justify="center" align="center">
            <Avatar
              avatar={data.avatar}
              fullName={data.fullName}
              badge={false}
              mobile
            />
            <Box>
              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={600}>
                Loại tài khoản
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }} color={color}>
                {level > EDITOR_LEVEL
                  ? "Quản trị viên"
                  : level == EDITOR_LEVEL
                    ? "Cộng tác viên"
                    : "Người dùng"}
              </Text>
            </Box>
          </Flex>
          <Button
            size="xs"
            fontSize={{ base: "10px", sm: "xs" }}
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<CgArrowsExchange />}
            onClick={onOpen}
          >
            Đổi ảnh
          </Button>
        </Flex>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi ảnh đại diện</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)} id="avatar">
              <FormControl>
                <Controller
                  control={control}
                  name="files"
                  render={({ field: { onChange } }) => (
                    <AvatarDropzone
                      onChange={onChange}
                      files={files}
                      setFiles={setFiles}
                      setValue={setValue}
                    />
                  )}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={handleClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              form="avatar"
              colorScheme="green"
              mr={3}
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

export default ModalAvatar;
