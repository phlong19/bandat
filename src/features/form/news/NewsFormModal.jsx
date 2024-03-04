import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Text,
  Badge,
  Input,
  FormControl,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import QuillEditor from "../QuillEditor";
import { useForm, Controller } from "react-hook-form";
import ChakraModalDialog from "../../../ui/ChakraModalDialog";
import ThumbnailDropzone from "./ThumbnailDropzone";
import { newsForm } from "../../../constants/message";
import { useCreateNews } from "./useCreateNews";
import {
  maxContent,
  maxSummary,
  maxTitle,
  minContent,
  minSummary,
  minTitle,
} from "../../../constants/anyVariables";

function NewsFormModal({
  edit = false,
  editData,
  isOpen,
  onOpen,
  onClose,
  setSlug,
}) {
  const [files, setFiles] = useState([]);
  let badgeColor = editData?.status ? "green" : "red";

  // dialog inside form
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: editData?.title,
      summary: editData?.summary,
      content: editData?.content,
    },
  });

  const { create, isCreating } = useCreateNews();

  function onSubmit(data) {
    console.log(data);
    if (!edit) {
      // create()
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        px="2rem"
        colorScheme="green"
        variant="outline"
        fontWeight={400}
      >
        Viết bài
      </Button>

      <Modal
        isOpen={isOpen}
        size="full"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>
            {`${!edit ? "Tạo" : "Sửa"} bài viết tin tức`}
          </ModalHeader>
          <ModalCloseButton onClick={onOpenDialog} />

          <ChakraModalDialog
            isOpen={isOpenDialog}
            onCloseDialog={onCloseDialog}
            onClose={onClose}
          />
          <ModalBody px={12}>
            <Flex gap={3} my={2} align="center">
              <Text fontSize="sm" fontWeight="700">
                Trạng thái:
              </Text>
              <Badge
                colorScheme={badgeColor}
                fontSize="sm"
                p="1px 7px"
                borderRadius="lg"
                textTransform="capitalize"
              >
                {editData?.status ? "Đã duyệt" : "Chưa duyệt"}
              </Badge>
            </Flex>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-[1500px]"
            >
              <VStack gap={3} w="100%">
                <FormControl isRequired>
                  <FormLabel>Tiêu đề</FormLabel>
                  <Input
                    {...register("title", {
                      required: newsForm.requiredMessage,
                      minLength: {
                        value: minTitle,
                        message: newsForm.minTitle,
                      },
                      maxLength: {
                        value: maxTitle,
                        message: newsForm.maxTitle,
                      },
                    })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tóm tắt</FormLabel>
                  <Input
                    {...register("summary", {
                      required: newsForm.requiredMessage,
                      minLength: {
                        value: minSummary,
                        message: newsForm.minSummary,
                      },
                      maxLength: {
                        value: maxSummary,
                        message: newsForm.maxSummary,
                      },
                    })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Nội dung bài</FormLabel>
                  <Controller
                    name="content"
                    control={control}
                    rules={{
                      required: newsForm.requiredMessage,
                      minLength: {
                        value: minContent,
                        message: newsForm.minContent,
                      },
                      maxLength: {
                        value: maxContent,
                        message: newsForm.maxContent,
                      },
                    }}
                    render={({ field: { onChange } }) => (
                      <QuillEditor
                        onChange={onChange}
                        value={editData?.content}
                      />
                    )}
                  />
                </FormControl>

                {/* thumbnail */}
                <FormControl isRequired>
                  <FormLabel>Thumbnail</FormLabel>
                  <Controller
                    name="files"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <ThumbnailDropzone
                        onChange={onChange}
                        files={files}
                        setFiles={setFiles}
                        setValue={setValue}
                      />
                    )}
                  />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter justifyContent="end" mr={12}>
            <Flex justify={"flex-end"} align="center" gap={3}>
              <Button colorScheme="blue" mr={3} onClick={onOpenDialog}>
                Close
              </Button>
              <ChakraModalDialog
                isOpen={isOpenDialog}
                onCloseDialog={onCloseDialog}
                onClose={onClose}
                setSlug={setSlug}
              />
              <Button
                // isLoading={isCreating || isUpdating}
                isLoading={isCreating}
                loadingText={!edit ? newsForm.creating : newsForm.saving}
                right={0}
                borderWidth={2}
                colorScheme="teal"
                variant="outline"
                type="submit"
              >
                {!edit ? newsForm.submit : newsForm.save}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewsFormModal;
