import { useAuth } from "../context/UserContext";
import { Center, Spinner } from "@chakra-ui/react";

import EditorDashboardTable from "../features/dashboard/EditorDashboardTable";

function EditorDashboard() {
  const {
    data: { id },
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <Center minH="80dvh">
        <Spinner />
      </Center>
    );
  }

  return <EditorDashboardTable id={id} />;
}

export default EditorDashboard;
