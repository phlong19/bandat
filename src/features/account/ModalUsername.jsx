import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { PiIdentificationBadgeLight } from "react-icons/pi";

function ModalUsername({ color, name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Tên người dùng
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Tên hiển thị trong bài đăng và với người dùng khác.
          </Text>
        </Box>
        <Flex gap='5rem'>
          <Text>{name}</Text>
          <Button
            size="xs"
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<PiIdentificationBadgeLight />}
            onClick={onOpen}
          >
            Sửa tên
          </Button>
        </Flex>
      </Flex>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>hi</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUsername;
