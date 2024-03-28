import { Link } from "react-router-dom";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { reCaptions } from "../../constants/anyVariables";
import { useGetFullList } from "./useGetFullList";
import PostBarChart from "../chart/PostBarChart";
import TypePieChart from "../chart/TypePieChart";

function UserDashboardTable({ id, level }) {
  const { reList, count, isLoading } = useGetFullList(id);

  return (
    <Flex flexDirection="column" gap={5}>
      <SimpleGrid columns={2} gap={2} h={300} minH={300} maxH={300} mb={8}>
        {/* chart 1 */}
        <PostBarChart />
        {/* chart 2 */}
        <TypePieChart />
      </SimpleGrid>

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
      />
    </Flex>
  );
}

export default UserDashboardTable;
