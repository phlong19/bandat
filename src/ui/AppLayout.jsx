import { Outlet } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

import { useCheckListPage } from "../hooks/useCheckListPage";
import { useMapView } from "../context/MapViewContext";

function AppLayout() {
  const isListingPage = useCheckListPage();
  const { mapView } = useMapView();

  return (
    <>
      <Header />
      <main
        className={`${
          isListingPage
            ? `${
                mapView
                  ? "lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)]"
                  : ""
              }`
            : "min-h-screen"
        } relative w-full bg-light text-dark dark:bg-dark dark:text-light lg:mt-[72px]`}
      >
        <Outlet />
      </main>
      {!isListingPage && <Footer />}
    </>
  );
}

export default AppLayout;
