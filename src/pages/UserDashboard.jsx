import { Box } from "@chakra-ui/react";
import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import ChakraTable from "../features/table/ChakraTable";
import { reCaptions } from "../constants/anyVariables";
import { data } from "../constants/products";
import TableRERow from "../features/table/TableRERow";
import { useAuth } from "../context/UserContext";
import REForm from "../features/form/REForm";

function UserDashboard({ form = false }) {
  const page = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";

  const { level } = useAuth();
  // future: get re dir data base on level
  // admin: all posts
  // user: only posts from that user

  const re_data = Array.from({ length: 3 })
    .map((item) => data)
    .flat()
    .slice(0, 8);

  return (
    <Box gridGap={4} display="grid">
      <ChakraBreadcrumb page={page} />
      {!form ? (
        <ChakraTable
          captions={reCaptions}
          data={re_data}
          title="Quản lý bài viết"
          render={(item) => (
            <TableRERow key={item.id} data={item} level={level} />
          )}
        />
      ) : (
        <REForm />
      )}
    </Box>
  );
}

export default UserDashboard;
