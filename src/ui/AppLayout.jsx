import { Outlet, useLocation } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

import { useMapView } from "../context/MapViewContext";

function AppLayout() {
  const { pathname } = useLocation();
  const isListingPage =
    pathname.includes("/nha-dat-") && !pathname.includes("/nguoi-dung/");
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
            : // : "min-h-screen"
              `${
                !pathname.includes("/tin-da-luu") &&
                !pathname.includes("/danh-ba/nguoi-dung")
                  ? "min-h-screen"
                  : ""
              }`
        } relative w-full bg-light text-dark dark:bg-dark dark:text-light lg:mt-[72px]`}
      >
        <Outlet />
      </main>
      {!isListingPage && <Footer />}
    </>
  );
}

export default AppLayout;
