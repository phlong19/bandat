import { Spinner } from "@chakra-ui/react";

function SpinnerFullPage() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-light dark:bg-dark">
      <Spinner emptyColor="gray.200" />
    </div>
  );
}

export default SpinnerFullPage;
