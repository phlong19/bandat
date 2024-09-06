import { Box, Button, Center, SimpleGrid, Spinner } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import ChakraTable from "../features/table/ChakraTable";
import { useGetFullOrderList } from "../hooks/useGetFullOrderList";
import { useAuth } from "../context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableOrderRow from "../features/table/TableOrderRow";
import { Helmet } from "react-helmet-async";
import { useGetOrderDetails } from "../hooks/useGetOrderDetails";
import OrderDetailsModal from "../ui/OrderDetailsModal";
import PostBarChart from "../features/chart/PostBarChart";
import useGetComposedOrderData from "../hooks/useGetComposedOrderData";

const captions = [
  "Mã",
  "Người đặt",
  "SĐT",
  "Giá trị đơn",
  "Trạng thái",
  "Ngày tạo",
];

function Order() {
  const { data: profile, level, isLoading } = useAuth();
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState<number | null>(null);

  const { data, count, isFetching } = useGetFullOrderList(profile?.id, query);
  const { details, isQuerying } = useGetOrderDetails(Number(selectedID));
  const {
    allData,
    isLoadingAllData,
    refetch,
    count: total,
  } = useGetComposedOrderData();

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
      <Helmet>
        <title>Quản lý đơn hàng</title>
      </Helmet>
      <ChakraBreadcrumb page="Quản lý đơn hàng" />

      <PostBarChart
        allData={allData as any}
        refetch={refetch}
        count={total}
        isFetching={isLoadingAllData}
      />

      <ChakraTable
        isLoading={isFetching}
        captions={captions}
        data={data}
        title="Quản lý danh sách đơn hàng"
        render={(item: any) => (
          <TableOrderRow
            setSelectedID={setSelectedID}
            key={item.id}
            data={item}
            level={level}
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

      <OrderDetailsModal
        isQuerying={isQuerying}
        onClose={onClose}
        selectedID={selectedID}
        details={details as any}
      />
    </Box>
  );
}

export default Order;
