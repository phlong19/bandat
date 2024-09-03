import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import ChakraTable from "../features/table/ChakraTable";
import { useGetFullOrderList } from "../hooks/useGetFullOrderList";
import { useAuth } from "../context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableOrderRow from "../features/table/TableOrderRow";

const captions = [
  "Người đặt",
  "SĐT",
  "Địa chỉ",
  "Giá trị đơn",
  "Trạng thái",
  "Ngày tạo",
];

function Order() {
  const { data: profile, level, isLoading } = useAuth();
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState<number | null>(null);

  const { data, count, isFetching } = useGetFullOrderList(profile?.id, query);

  function onClose() {
    setSelectedID(null);
  }

  if (isLoading) {
    return (
      <Center minH="70dvh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Quản lý đơn hàng" />

      {/* <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={2}
          h={{ base: 1000, lg: 350 }}
          minH={{ base: 1000, lg: 350 }}
          maxH={{ base: 1000, lg: 350 }}
          mb={{ lg: 14, xl: 8 }}
        >
         
          <PostBarChart allData={data} isFetchingAllData={isFetching} />
         
          <TypePieChart
            count={total}
            data={data}
            isLoading={isFetching}
            refetch={refetch}
          />
        </SimpleGrid> */}

      <ChakraTable
        isLoading={isFetching}
        captions={captions}
        data={data}
        title="Quản lý danh sách đơn hàng"
        render={(item: any) => (
          <TableOrderRow
            key={item.id}
            data={item}
            level={level}
            userID={profile.id}
          />
        )}
        primaryButton={
          <Link to="/danh-muc/thuc-pham-chuc-nang">
            <Button variant="outline" colorScheme="green" borderWidth={2}>
              Thêm đơn hàng
            </Button>
          </Link>
        }
        count={count}
        setQuery={setQuery}
        order
      />

      <Modal isOpen={Boolean(selectedID)} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hi</ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme="green" variant="outline">
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Order;
