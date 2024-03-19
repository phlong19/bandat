import { Spinner, useColorModeValue } from "@chakra-ui/react";

function SpinnerFullPage() {
  const empty = useColorModeValue("gray.300", "gray.600");

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-light dark:bg-dark">
      <Spinner emptyColor={empty} />
    </div>
  );
}

export default SpinnerFullPage;
