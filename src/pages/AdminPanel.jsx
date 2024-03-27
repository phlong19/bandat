import { Center, Spinner } from "@chakra-ui/react";
import AdminDashboardTable from "../features/dashboard/AdminDashboardTable";

import { useAuth } from "../context/UserContext";

function AdminPanel() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <AdminDashboardTable />;
}

export default AdminPanel;
