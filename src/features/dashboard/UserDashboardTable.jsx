import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Center, Spinner, Button } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { getREList } from "../../services/apiManage";
import { reCaptions } from "../../constants/anyVariables";
import EmptyTable from "../../ui/EmptyTable";

function UserDashboardTable({ id, level }) {
  const { data, isLoading } = useQuery({
    queryKey: ["REList"],
    queryFn: () => getREList(id),
  });

  if (isLoading) {
    return (
      <Center minH="80%">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (data.length < 1) {
    return (
      <EmptyTable message="ban chua dang bai viet moi nao, khong co dat de ban a? ban nha di">
        <Button>
          <Link to="/dang-tin">bai viet moi</Link>
        </Button>
        <Link to="/quan-ly-bai-viet/form-control-sample-usage-for-a-radio-or-checkbox-group">
          test
        </Link>
      </EmptyTable>
    );
  }

  return (
    <ChakraTable
      captions={reCaptions}
      data={data}
      title="Quản lý bài viết"
      render={(item) => (
        <TableRERow key={Math.random()} data={item} level={level} />
      )}
      primaryButton={
        <Button>
          <Link to="/dang-tin">bai viet moi</Link>
        </Button>
      }
    />
  );
}

export default UserDashboardTable;
