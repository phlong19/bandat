import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Center, Spinner, Button } from "@chakra-ui/react";

import ChakraTable from "../table/ChakraTable";
import TableRERow from "../table/TableRERow";

import { getFullREList } from "../../services/apiManage";
import { reCaptions } from "../../constants/anyVariables";
import EmptyTable from "../../ui/EmptyTable";

function UserDashboardTable({ id, level }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get(page)) : 1;
  const { data, isLoading } = useQuery({
    queryKey: ["REList"],
    queryFn: () => getFullREList(id, page),
  });

  if (isLoading) {
    return (
      <Center minH="80%">
        <Spinner size="lg" thickness="4px" />
      </Center>
    );
  }

  if (data.length < 1) {
    return (
      <EmptyTable message="ban chua dang bai viet moi nao, khong co dat de ban a? ban nha di">
        <Link to="/dang-tin">
          <Button>bai viet moi</Button>
        </Link>
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
        <Link to="/dang-tin">
          <Button>bai viet moi</Button>
        </Link>
      }
      count={data.length}
    />
  );
}

export default UserDashboardTable;
