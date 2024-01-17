import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import ErrorFallBack from "../../ui/ErrorFallBack";

import useHomePage from "./useHomePage";

function HomePageList() {
  const { data, error, isLoading } = useHomePage();

  if (isLoading) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center bg-light dark:bg-dark">
        <Spinner inButton={false} width={50} height={50} />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <ErrorFallBack />;
  }

  return (
    <div>
      home
    </div>
  );
}

export default HomePageList;
