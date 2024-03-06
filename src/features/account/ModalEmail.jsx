import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

function ModalEmail({ color, email, isConfirmed }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="xs" textTransform="capitalize">
            Địa chỉ Email
          </Heading>
          <Text pt="2" fontSize="xs" color={color}>
            Email kết nối với tài khoản.
          </Text>
        </Box>
        <Flex gap={20}>
          <Box>
            <Text>{email}</Text>
            {isConfirmed ? (
              <Badge
                colorScheme="green"
                p="1px 10px"
                fontSize="10px"
                borderRadius="md"
                textTransform="capitalize"
              >
                đã xác thực
              </Badge>
            ) : (
              <Badge
                colorScheme="red"
                p="1px 10px"
                fontSize="10px"
                borderRadius="md"
                textTransform="capitalize"
              >
                chưa xác thực
              </Badge>
            )}
          </Box>
          <Button
            size="xs"
            fontWeight="400"
            colorScheme="green"
            variant="outline"
            borderWidth={1.5}
            rightIcon={<BiEditAlt />}
            onClick={onOpen}
          >
            Thay đổi
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

export default ModalEmail;
