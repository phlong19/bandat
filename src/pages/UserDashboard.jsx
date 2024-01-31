import { Box } from "@chakra-ui/react";
import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";

function UserDashboard({ form = false }) {
  const page = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";

  return (
    <Box>
      <ChakraBreadcrumb page={page} />
      {!form ? <div>table</div> : <div>form</div>}
    </Box>
  );
}

export default UserDashboard;
