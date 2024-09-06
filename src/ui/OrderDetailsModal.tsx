import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { OrderData } from "../model";
import { formatCurrencyWOText } from "../utils/helper";
import { format } from "date-fns";

interface Props {
  isQuerying: boolean;
  selectedID: number | null;
  onClose: () => void;
  details: OrderData;
}

export default function OrderDetailsModal({
  selectedID,
  onClose,
  isQuerying,
  details,
}: Props) {
  const data = details ? JSON.parse(details?.details?.toString() ?? "") : [];
  const date = details ? new Date(details.created_at) : new Date();

  return (
    <Modal
      isOpen={Boolean(selectedID)}
      onClose={onClose}
      isCentered
      size={{ bsae: "2xl", lg: "5xl" }}
    >
      <ModalOverlay />
      <ModalContent maxH="90dvh" overflowY="auto" border="1px solid lightgray">
        <ModalHeader>Chi tiết đơn hàng mã #{selectedID}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isQuerying ? (
            <Center minH="30dvh">
              <Spinner />
            </Center>
          ) : (
            <Box minH="30dvh" fontSize={15}>
              <SimpleGrid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={2}
              >
                <Stack spacing={2}>
                  <CustomText label="Tên người đặt:">
                    {details?.name}
                  </CustomText>
                  <CustomText label="SĐT:"> {details?.phone}</CustomText>
                  <CustomText label="Địa chỉ:">
                    {details?.address}, {details?.ward.wardName},{" "}
                    {details?.dis.disName},{details?.city.cityName}
                  </CustomText>
                </Stack>

                <Stack spacing={2}>
                  <CustomText label="Email:">
                    {details?.email || "---"}
                  </CustomText>
                  <CustomText label="Tạo lúc:">
                    {format(date, "HH:mm dd/MM/yyyy")}
                  </CustomText>
                  <CustomText label="Ghi chú:">
                    {details?.note || "Không có"}
                  </CustomText>
                </Stack>
              </SimpleGrid>
              <Table mt={3} variant="striped">
                <Thead>
                  <Tr>
                    {[
                      "Ảnh",
                      "Tên",
                      "Thương hiệu / NSX",
                      "Giá tiền",
                      "Số lượng",
                    ].map((i, index) => (
                      <Th key={index}>{i}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((i: any) => (
                    <Tr key={i.id}>
                      <Td>
                        <AspectRatio minW="80px" ratio={16 / 9}>
                          <Image
                            src={i?.images[0]?.mediaLink}
                            className="!rounded"
                          />
                        </AspectRatio>
                      </Td>
                      <Td maxW={200}>
                        <Text noOfLines={2}>{i.name}</Text>
                      </Td>
                      <Td>
                        <Stack spacing={1}>
                          <Text>{i?.brand} /</Text>
                          <Text noOfLines={2}>{i?.manufacturer}</Text>
                        </Stack>
                      </Td>
                      <Td>{formatCurrencyWOText(i?.price)}</Td>

                      <Td>{i?.quantity}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Đóng
          </Button>
          <Text fontSize="20">
            Tổng:{" "}
            <span className="text-primary">
              {formatCurrencyWOText(details?.total)}
            </span>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CustomText({ label, children }: { label?: string; children: any }) {
  return (
    <Text noOfLines={2}>
      <span className="text-primary">{label}</span> {children}
    </Text>
  );
}
