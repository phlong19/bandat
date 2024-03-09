import { useAuth } from "../context/UserContext";
import { Center, Spinner } from "@chakra-ui/react";

import EditorDashboardTable from "../features/dashboard/EditorDashboardTable";
import { useGetFullNewsList } from "../features/dashboard/useGetFullNewsList";

function EditorDashboard() {
  const {
    data: { id },
  } = useAuth();
  const { data, count, isLoading } = useGetFullNewsList(id);

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <EditorDashboardTable data={data} count={count} />;
}

export default EditorDashboard;
