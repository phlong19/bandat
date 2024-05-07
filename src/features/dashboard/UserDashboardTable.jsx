import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";
import PostBarChart from "../chart/PostBarChart";
import TypePieChart from "../chart/TypePieChart";
import { useGetREPostData } from "../chart/useGetREPostData";

import { useGetFullList } from "./useGetFullList";
import { EDITOR_LEVEL, reCaptions } from "../../constants/anyVariables";

function UserDashboardTable({ id, level }) {
  const [query, setQuery] = useState("");
  const { reList, count, isLoading } = useGetFullList(id, query);
  const {
    data,
    count: total,
    isLoading: isFetching,
    refetch,
  } = useGetREPostData(id, level);

  return (
    <Flex flexDirection="column" gap={5}>
      {level != EDITOR_LEVEL && total > 0 && (
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={2}
          h={{ base: 1000, lg: 350 }}
          minH={{ base: 1000, lg: 350 }}
          maxH={{ base: 1000, lg: 350 }}
          mb={{ lg: 14, xl: 8 }}
        >
          {/* chart 1 */}
          <PostBarChart allData={data} isFetchingAllData={isFetching} />
          {/* chart 2 */}
          <TypePieChart
            count={total}
            data={data}
            isLoading={isFetching}
            refetch={refetch}
          />
        </SimpleGrid>
      )}

      {/* table */}
      <ChakraTable
        isLoading={isLoading}
        captions={reCaptions}
        data={reList}
        title="Quản lý danh sách bài viết"
        render={(item) => (
          <TableRERow key={item.id} data={item} level={level} userID={id} />
        )}
        primaryButton={
          <Link to="/dang-tin">
            <Button variant="outline" colorScheme="green" borderWidth={2}>
              Tạo bài đăng
            </Button>
          </Link>
        }
        count={count}
        re
        setQuery={setQuery}
      />
    </Flex>
  );
}

export default UserDashboardTable;
