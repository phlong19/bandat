import { Outlet } from "react-router-dom";
import ManageNavbar from "./ManageNavbar";

import { Flex, Box } from "@chakra-ui/react";

function ManageLayout() {
  return (
    <Flex maxH="100dvh">
      <ManageNavbar />
      <Box
        flex={1}
        minH="100dvh"
        overflowY="scroll"
        scrollBehavior="smooth"
        px="6"
        py="30"
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default ManageLayout;
