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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function ModalAdress() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Flex align="center" justify="space-between">
      <Accordion allowToggle w="100%">
        <AccordionItem border="none">
          <h2>
            <AccordionButton pl={0} justifyContent="space-between">
              <Box>
                <Heading size="xs" textAlign="left" textTransform="capitalize">
                  Địa chỉ
                </Heading>
                <Text pt="2" fontSize="xs" color={color}>
                  (Tùy chọn) Địa chỉ hiển thị với người dùng khác.
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel px={0} pb={0} pt={4}>
            <AddressSelect
              cityID={cityID}
              disID={disID}
              wardID={wardID}
              setCityID={setCityID}
              setDisID={setDisID}
              setWardID={setWardID}
            />
            <Box w="100%" textAlign="end" mt={4}>
              <Button
                size="xs"
                fontWeight="400"
                colorScheme="green"
                variant="outline"
                borderWidth={1.5}
                rightIcon={<BiSave />}
              >
                Lưu
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default ModalAdress;
