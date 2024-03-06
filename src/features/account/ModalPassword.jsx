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
import { MdOutlineLockReset } from "react-icons/md";

function ModalPassword({ color }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Mật khẩu
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Sử dụng cho đăng nhập & xác thực chủ sở hữu tài khoản, vui lòng
            không chia sẻ.
          </Text>
        </Box>
        <Button
          size="xs"
          fontWeight="400"
          colorScheme="green"
          variant="outline"
          borderWidth={1.5}
          rightIcon={<MdOutlineLockReset />}
          onClick={onOpen}
        >
          Đổi mật khẩu
        </Button>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
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

export default ModalPassword;
