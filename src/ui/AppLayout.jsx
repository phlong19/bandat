import { Outlet } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="bg-light dark:bg-dark w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
