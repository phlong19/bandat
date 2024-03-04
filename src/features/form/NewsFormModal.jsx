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
  Box,
  Text,
  Badge,
  Alert,
  AlertIcon,
  Input,
  FormControl,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import QuillEditor from "./QuillEditor";
import { useForm, Controller } from "react-hook-form";
import ChakraModalDialog from "../../ui/ChakraModalDialog";
import { getStatusBadgeColor } from "../../utils/helper";
import { newsForm } from "../../constants/message";
import FilesDropzone from "./FilesDropzone";

function NewsFormModal({ edit = false, editData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let badgeColor = getStatusBadgeColor(editData?.status.id);

  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Button onClick={onOpen} px="2rem" colorScheme="green" variant="outline">
        Viết bài
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {`${!edit ? "Tạo" : "Sửa"} bài viết tin tức`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={3} ml="auto" align="center">
              <Text fontSize="sm" fontWeight="700">
                Trạng thái:
              </Text>
              <Badge
                colorScheme={badgeColor}
                fontSize="sm"
                p="3px 10px"
                borderRadius="lg"
                textTransform="capitalize"
              >
                {editData?.status.status || "Chưa duyệt"}
              </Badge>
            </Flex>

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={3} w="100%">
                <FormControl isRequired>
                  <FormLabel>title</FormLabel>
                  <Input />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>summary</FormLabel>
                  <Input />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>content</FormLabel>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <QuillEditor onChange={onChange} />
                    )}
                  />
                </FormControl>
                <Controller
                  name="files"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <p>thumbnail dropzone</p>
                  )}
                />
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Box>
              <Alert status="warning">
                <AlertIcon />
                warning dont press esc while writing or close when not finished
                yet, your work will be lost{" "}
              </Alert>
            </Box>
            <Flex justify={"flex-end"} align="center" gap={3}>
              <Button colorScheme="blue" mr={3} onClick={onOpenDialog}>
                Close
              </Button>
              <ChakraModalDialog
                isOpen={isOpenDialog}
                onCloseDialog={onCloseDialog}
                onClose={onClose}
              />
              <Button
                // isLoading={isCreating || isUpdating}
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
