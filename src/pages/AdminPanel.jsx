import { Center, Spinner } from "@chakra-ui/react";
import AdminDashboardTable from "../features/dashboard/AdminDashboardTable";

import { useAuth } from "../context/UserContext";

function AdminPanel() {
  const { isLoading } = useAuth();
  const comp = window.location.href.includes("/companies");

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <AdminDashboardTable sub={comp} />;
}

export default AdminPanel;
