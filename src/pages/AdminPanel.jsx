import { Center, Spinner } from "@chakra-ui/react";
import AdminDashboardTable from "../features/dashboard/AdminDashboardTable";

import { useAuth } from "../context/UserContext";
import { useGetFullListDocs } from "../features/dashboard/useGetFullListDocs";

function AdminPanel() {
  const { isLoading } = useAuth();

  const { data, count, isFetching } = useGetFullListDocs();

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <AdminDashboardTable count={count} data={data} />;
}

export default AdminPanel;
