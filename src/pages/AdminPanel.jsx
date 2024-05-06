import { Center, Spinner } from "@chakra-ui/react";
import AdminDashboardTable from "../features/dashboard/AdminDashboardTable";

import { useAuth } from "../context/UserContext";
import { useLocation } from "react-router-dom";

function AdminPanel() {
  const { isLoading } = useAuth();
  const location = useLocation();
  let check = false;

  if (location.pathname.includes("role-management")) {
    check = true;
  }

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <AdminDashboardTable sub={check} />;
}

export default AdminPanel;
