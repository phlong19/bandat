import { Box } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import ChakraTable from "../features/table/ChakraTable";
import TableRERow from "../features/table/TableRERow";
import REForm from "../features/form/REForm";

import { useAuth } from "../context/UserContext";
import { reCaptions, LIMIT_PER_PAGE } from "../constants/anyVariables";

import { data } from "../constants/products";

function UserDashboard({ form = false }) {
  const page = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";

  const { level } = useAuth();
  // future: get re dir data base on level
  // admin: all posts
  // user: only posts from that user

  const re_data = Array.from({ length: 4 })
    .map((item) => data)
    .flat()
    .slice(0, LIMIT_PER_PAGE);

  return (
    <Box gridGap={4} display="grid">
      <ChakraBreadcrumb page={page} />
      {!form ? (
        <ChakraTable
          captions={reCaptions}
          data={re_data}
          title="Quản lý bài viết"
          render={(item) => (
            <TableRERow key={Math.random()} data={item} level={level} />
          )}
        />
      ) : (
        <Box maxWidth="90%" minWidth="85%" mx="auto">
          <REForm />
        </Box>
      )}
    </Box>
  );
}

export default UserDashboard;
