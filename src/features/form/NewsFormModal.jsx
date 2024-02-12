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
  Alert,
  AlertIcon,
  Text,
  Input,
  FormControl,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import QuillEditor from "./QuillEditor";
import { useForm, Controller } from "react-hook-form";

function NewsFormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tao moi bai viet tin tuc</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={3} w="100%">
                <FormControl isRequired>
                  <FormLabel>hi</FormLabel>
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
                <Button variant="outline" type="submit">submit</Button>
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
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewsFormModal;
