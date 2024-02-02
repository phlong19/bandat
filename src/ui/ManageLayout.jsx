import { Outlet } from "react-router-dom";
import ManageNavbar from "./ManageNavbar";

import { Flex, Box } from "@chakra-ui/react";

function ManageLayout() {
  return (
    <Flex>
      <ManageNavbar />
      <Box flex={1} minH="100dvh" overflowY="scroll" px="6" pt="30">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default ManageLayout;
