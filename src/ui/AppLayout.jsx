import { Outlet } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="relative min-h-[600px] w-full bg-light text-dark dark:bg-dark dark:text-light">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
