import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
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

function ModalPassword({ color, id }) {
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
          Cập nhật
        </Button>
      </Flex>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi mật khẩu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="password">
              <InputGroup>
                <Input />
                <InputRightElement>
                  <Button size="xs">hi</Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose} size="sm" variant="outline">
              Hủy
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              isLoading={true}
              form="password"
              type="submit"
              color="black"
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPassword;
