import { useQuery } from "@tanstack/react-query";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import Avatar from "../../ui/Avatar";
import { EDITOR_LEVEL } from "../../constants/anyVariables";
import { getFullAddress } from "../../services/apiGeneral";
import { CgArrowsExchange } from "react-icons/cg";

function ModalAvatar({ data, color, cityID, disID, wardID, level }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: address, isLoading: isFetching } = useQuery({
    queryKey: ["user-address"],
    queryFn: () => getFullAddress(cityID, disID, wardID, data?.address),
  });

  return (
    <>
      <Box>
        <Heading size="xs" c mb={3} textTransform="capitalize">
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
              <Text fontSize="sm" color={color}>
                {level == EDITOR_LEVEL ? "Cộng tác viên" : "Người dùng"}
              </Text>
              {!isFetching && (
                <Text fontSize="xs" color="secondary">
                  {address}
                </Text>
              )}
            </Box>
          </Flex>
          <Button
            size="xs"
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

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
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

export default ModalAvatar;
