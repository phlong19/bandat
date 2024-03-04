import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Flex,
  Text,
  Textarea,
  Badge,
  Input,
  FormControl,
  VStack,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import QuillEditor from "../QuillEditor";
import { useForm, Controller } from "react-hook-form";
import ChakraModalDialog from "../../../ui/ChakraModalDialog";
import ThumbnailDropzone from "./ThumbnailDropzone";
import { acceptFiles, newsForm } from "../../../constants/message";
import { useCreateNews } from "./useCreateNews";
import { useAuth } from "../../../context/UserContext";
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
  const {
    data: { id },
  } = useAuth();
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

  const { create, isCreating } = useCreateNews(onClose);

  function onSubmit(data) {
    console.log(data);
    if (!edit) {
      create({ ...data, userID: id, status: false });
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        px="2rem"
        colorScheme="green"
        variant="outline"
        borderWidth={2}
      >
        Viết bài
      </Button>

      <Modal
        isOpen={isOpen}
        size="six"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1} display="flex" justifyContent="space-between">
            {`${!edit ? "Tạo" : "Sửa"} bài viết tin tức`}
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
          </ModalHeader>

          <ChakraModalDialog
            isOpen={isOpenDialog}
            onCloseDialog={onCloseDialog}
            onClose={() => {
              setValue("files", []);
              setFiles([]);
              onClose();
            }}
          />
          <ModalBody px={7}>
            <form onSubmit={handleSubmit(onSubmit)} id="form">
              <VStack gap={3} w="100%">
                <FormControl isRequired isInvalid={errors.title}>
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
                  {errors.title && (
                    <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={errors.summary}>
                  <FormLabel>Tóm tắt</FormLabel>
                  <Textarea
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
                  {errors.summary && (
                    <FormErrorMessage>
                      {errors.summary.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={errors.content}>
                  <FormLabel>Nội dung bài</FormLabel>
                  {errors.content && (
                    <FormErrorMessage mb={2}>
                      {errors.content.message}
                    </FormErrorMessage>
                  )}
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
                <FormControl isRequired isInvalid={errors.files}>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormHelperText mb={2}>{acceptFiles}</FormHelperText>
                  {errors.files && (
                    <FormErrorMessage mb={2}>
                      {errors.files.message}
                    </FormErrorMessage>
                  )}
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

          <ModalFooter justifyContent="end">
            <Flex justify="flex-end" align="center" gap={3}>
              <Button colorScheme="blue" variant="ghost" onClick={onOpenDialog}>
                Close
              </Button>
              <ChakraModalDialog
                isOpen={isOpenDialog}
                onCloseDialog={onCloseDialog}
                onClose={onClose}
                setSlug={setSlug}
                // fix clear img on close
              />
              <Button
                form="form"
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
