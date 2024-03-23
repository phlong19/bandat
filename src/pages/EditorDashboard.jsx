import { useAuth } from "../context/UserContext";
import { Center, Spinner } from "@chakra-ui/react";

import EditorDashboardTable from "../features/dashboard/EditorDashboardTable";
import { useGetFullNewsList } from "../features/dashboard/useGetFullNewsList";

function EditorDashboard() {
  const {
    data: { id },
    isLoading,
  } = useAuth();
  const { data, count, isLoading: isFetching } = useGetFullNewsList(id);

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <EditorDashboardTable data={data} count={count} />;
}

export default EditorDashboard;
