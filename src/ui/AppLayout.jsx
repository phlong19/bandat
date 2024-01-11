import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Header from "../ui/Header";
import Footer from "../ui/Footer";
import MobileHeader from "./MobileHeader";

function AppLayout() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width:1024px)",
  });

  return (
    <div>
      {isDesktopOrLaptop ? <Header /> : <MobileHeader />}
      <main className="min-h-[4000px] w-full bg-green-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
