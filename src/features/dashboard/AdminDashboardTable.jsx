import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ChakraBreadcrumb from "../../ui/ChakraBreadcrumb";
import ChakraTable from "../table/ChakraTable";
import TableDocRow from "../table/TableDocRow";
import TableTypeRow from "../table/TableTypeRow";
import TableUserRow from "../table/TableUserRow";
import TableContactRow from "../table/TableContactRow";
import AdminChart from "../chart/AdminChart";

import { useGetFullTypeList } from "./useGetFullTypeList";
import { useGetFullListDocs } from "./useGetFullListDocs";
import { useGetFullUsers } from "./useGetFullUsers";
import { profileCaptions } from "../../constants/anyVariables";
import { useGetContactLists } from "./useGetContactLists";

function AdminDashboardTable({ sub }) {
  const [query, setQuery] = useState("");
  const { data, count, isFetching } = useGetFullListDocs(sub);
  const { types, typesCount, isLoading } = useGetFullTypeList(sub);
  const { contacts, contactCount, isFetchingContact } = useGetContactLists(sub);
  const { users, usersCount, isUsering } = useGetFullUsers(query);

  // sub

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Admin" />

      {sub ? (
        // <ChakraTable  />
        "companies"
      ) : (
        <>
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

          <ChakraTable
            isLoading={isFetchingContact}
            data={contacts}
            captions={[
              "Tên",
              "Số điện thoại",
              "Email",
              "Tiêu đề",
              "Nội dung",
              "Ngày gửi",
              "Người dùng",
            ]}
            count={contactCount}
            page="contact-page"
            render={(item) => <TableContactRow data={item} key={item.id} />}
            title="Danh sách tin liên hệ, góp ý"
            viewOnly
            profile={false}
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
              render={(item) => (
                <TableTypeRow data={item} key={item.REType_ID} />
              )}
              title="Danh sách loại hình bất động sản"
              profile={false}
            />
          </Flex>
        </>
      )}
    </Box>
  );
}

export default AdminDashboardTable;
