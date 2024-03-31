import { Box, Flex } from "@chakra-ui/react";

import ChakraBreadcrumb from "../../ui/ChakraBreadcrumb";
import ChakraTable from "../table/ChakraTable";
import TableDocRow from "../table/TableDocRow";
import TableTypeRow from "../table/TableTypeRow";
import TableUserRow from "../table/TableUserRow";
import AdminChart from "../chart/AdminChart";

import { useGetFullTypeList } from "./useGetFullTypeList";
import { useGetFullListDocs } from "./useGetFullListDocs";
import { useGetFullUsers } from "./useGetFullUsers";
import { profileCaptions } from "../../constants/anyVariables";
import { useState } from "react";

function AdminDashboardTable() {
  const [query, setQuery] = useState("");
  const { data, count, isFetching } = useGetFullListDocs();
  const { types, typesCount, isLoading } = useGetFullTypeList();
  const { users, usersCount, isUsering } = useGetFullUsers(query);

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Admin" />
      {/* chart */}
      <AdminChart />

      <ChakraTable
        isLoading={isUsering}
        page="user-page"
        viewOnly
        captions={profileCaptions}
        count={usersCount}
        data={users}
        render={(item) => <TableUserRow data={item} key={item.id} />}
        title="Danh sách hồ sơ người dùng"
        setQuery={setQuery}
      />
      <Flex gap={3} w="full" maxH="55dvh">
        <ChakraTable
          isLoading={isLoading}
          page="doc-page"
          viewOnly
          captions={["ID", "Tên", "Ngày tạo"]}
          count={count}
          data={data}
          render={(item) => <TableDocRow data={item} key={item.doc_id} />}
          title="Danh sách giấy tờ, tài liệu pháp lý"
          profile={false}
        />
        <ChakraTable
          viewOnly
          isLoading={isFetching}
          page="type-page"
          captions={["Type ID", "Tên loại hình", "Ngày tạo"]}
          count={typesCount}
          data={types}
          render={(item) => <TableTypeRow data={item} key={item.REType_ID} />}
          title="Danh sách loại hình bất động sản"
          profile={false}
        />
      </Flex>
    </Box>
  );
}

export default AdminDashboardTable;
