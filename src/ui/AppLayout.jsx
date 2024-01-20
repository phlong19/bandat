import { Outlet } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

import { useCheckListPage } from "../hooks/useCheckListPage";

function AppLayout() {
  const isListingPage = useCheckListPage();

  return (
    <>
      <Header />
      <main
        className={`${
          isListingPage
            ? "lg:mt-[72px] lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)]"
            : "min-h-screen"
        } relative w-full bg-light text-dark dark:bg-dark dark:text-light`}
      >
        <Outlet />
      </main>
      {!isListingPage && <Footer />}
    </>
  );
}

export default AppLayout;
