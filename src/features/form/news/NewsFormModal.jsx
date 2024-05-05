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
  FormErrorMessage,
  Spinner,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import slugify from "react-slugify";
import QuillEditor from "../QuillEditor";
import { useForm, Controller } from "react-hook-form";
import ChakraModalDialog from "../../../ui/ChakraModalDialog";
import ThumbnailDropzone from "./ThumbnailDropzone";
import { newsForm } from "../../../constants/message";
import { useCreateNews } from "./useCreateNews";
import { useUpdateNews } from "./useUpdateNews";
import { useAuth } from "../../../context/UserContext";
import {
  maxContent,
  maxSummary,
  maxTitle,
  minContent,
  minSummary,
  minTitle,
} from "../../../constants/anyVariables";
import NewsActions from "./NewsActions";
import unidecode from "unidecode";

function NewsFormModal({
  edit = false,
  editData,
  isOpen,
  onOpen,
  onClose,
  setSlug,
  isLoading,
}) {
  const {
    data: { id },
    level,
  } = useAuth();
  let badgeColor = editData?.status ? "green" : "red";

  // load thumbnail when edit
  const existedFiles = editData?.thumbnail ? [editData.thumbnail] : [];
  const [files, setFiles] = useState([...existedFiles]);

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
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: editData?.title,
      summary: editData?.summary,
      content: editData?.content,
      files: [...existedFiles],
    },
  });

  const { create, isCreating } = useCreateNews(handleClose);
  const { update, isUpdating } = useUpdateNews(handleClose);

  function handleClose() {
    setSlug("");
    setValue("files", []);
    setFiles([]);
    onClose();
  }

  function onSubmit(data) {
    if (!data?.files || data.files.length < 1) {
      return setError("files", {
        type: "required",
        message: newsForm.missingThumb,
      });
    }

    const formattedName = unidecode(data.title);
    const slug = slugify(formattedName);

    if (!edit) {
      create({ ...data, userID: id, status: false, slug });
    } else {
      update({
        ...data,
        postID: editData.id,
        // author & current editing user
        authorID: editData.userID,
        userID: id,
        level,
        // old thumb
        oldFiles: existedFiles,
        status: false,
        slug,
      });
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
        minW={100}
      >
        Viết bài
      </Button>

      <Modal
        isOpen={isOpen}
        size={isLoading ? "full" : "six"}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        {isLoading ? (
          <ModalContent className="modal-media" bg="blackAlpha.600">
            <ModalBody>
              <Center w="full" minH="90dvh">
                <Spinner />
              </Center>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader pb={1} display="flex" justifyContent="space-between">
              {`${!edit ? "Tạo" : "Sửa"} bài viết tin tức`}
              <Flex gap={3} my={2} align="center" pr={12}>
                <Text fontSize="sm" fontWeight="700">
                  Trạng thái:
                </Text>
                <Badge
                  colorScheme={badgeColor}
                  fontSize="xs"
                  p="1px 7px"
                  borderRadius="md"
                  textTransform="capitalize"
                >
                  {editData?.status ? "Đã duyệt" : "Chưa duyệt"}
                </Badge>
              </Flex>
            </ModalHeader>
            <ModalCloseButton onClick={onOpenDialog} />

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
                      <FormErrorMessage>
                        {errors.title.message}
                      </FormErrorMessage>
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

            <ModalFooter justifyContent={edit ? `space-between` : "end"}>
              {edit && (
                <NewsActions
                  authorID={editData.userID}
                  id={editData.id}
                  level={level}
                  status={editData.status}
                  userID={id}
                  setSlug={setSlug}
                />
              )}
              <Flex justify="flex-end" align="center" gap={3}>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  onClick={onOpenDialog}
                >
                  Đóng
                </Button>
                <ChakraModalDialog
                  isOpen={isOpenDialog}
                  onCloseDialog={onCloseDialog}
                  onClose={handleClose}
                />
                <Button
                  form="form"
                  isLoading={isCreating || isUpdating}
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
        )}
      </Modal>
    </>
  );
}

export default NewsFormModal;
