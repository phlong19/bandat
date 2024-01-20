import toast from "react-hot-toast";

import SpinnerFullPage from "../../ui/SpinnerFullPage";
import ErrorFallBack from "../../ui/ErrorFallBack";

import useHomePage from "./useHomePage";

function HomePageList() {
  const { data, error, isLoading } = useHomePage();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  if (error) {
    toast.error(error.message);
    return <ErrorFallBack />;
  }

  return <div>home</div>;
}

export default HomePageList;
