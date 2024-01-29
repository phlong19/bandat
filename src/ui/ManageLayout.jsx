import { Outlet } from "react-router-dom";

import { AppShell, Container, Grid } from "@mantine/core";

function ManageLayout() {
  return (
    <AppShell withBorder={false} order aside={{ width: "50px" }}>
      <AppShell.Aside bg="red"></AppShell.Aside>
      <AppShell.Main bg="grape">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default ManageLayout;
