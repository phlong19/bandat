import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { useGetFullList } from "./useGetFullList";
import { reCaptions } from "../../constants/anyVariables";

function UserDashboardTable({ id, level }: { id: string; level: number }) {
  const [query, setQuery] = useState("");
  const { reList, count, isLoading } = useGetFullList(id, query);

  return (
    <Flex flexDirection="column" gap={5}>
      <ChakraTable
        isLoading={isLoading}
        captions={reCaptions}
        data={reList}
        title="Quản lý danh sách sản phẩm"
        render={(item: any) => (
          <TableRERow key={item.id} data={item} level={level} />
        )}
        primaryButton={
          <Link to="/them-san-pham">
            <Button variant="outline" colorScheme="green" borderWidth={2}>
              Thêm sản phẩm
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
