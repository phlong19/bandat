import { Link } from "react-router-dom";
import { Center, Spinner, Button } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { reCaptions } from "../../constants/anyVariables";
import EmptyTable from "../../ui/EmptyTable";
import { useGetFullList } from "./useGetFullList";
import { emptyREList } from "../../constants/message";

function UserDashboardTable({ id, level }) {
  const { reList, count, isLoading } = useGetFullList(id);

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  if (reList.length < 1) {
    return (
      <EmptyTable message={emptyREList}>
        <Link to="/dang-tin">
          <Button colorScheme="green" variant="solid">
            Tạo bài đăng
          </Button>
        </Link>
      </EmptyTable>
    );
  }

  return (
    <ChakraTable
      captions={reCaptions}
      data={reList}
      title="Quản lý bài viết"
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
  );
}

export default UserDashboardTable;
