import { Link } from "react-router-dom";
import { Center, Spinner, Button } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { reCaptions } from "../../constants/anyVariables";
import EmptyTable from "../../ui/EmptyTable";
import { useGetFullList } from "./useGetFullList";

function UserDashboardTable({ id, level }) {
  const { reList, count, isLoading } = useGetFullList(id);

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner size="lg" thickness="4px" />
      </Center>
    );
  }

  if (reList.length < 1) {
    return (
      <EmptyTable message="ban chua dang bai viet moi nao, khong co dat de ban a? ban nha di">
        <Link to="/dang-tin">
          <Button>bai viet moi</Button>
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
        <TableRERow key={Math.random()} data={item} level={level} userID={id} />
      )}
      primaryButton={
        <Link to="/dang-tin">
          <Button>bai viet moi</Button>
        </Link>
      }
      count={count}
    />
  );
}

export default UserDashboardTable;
