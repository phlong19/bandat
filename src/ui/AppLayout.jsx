import { Outlet } from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      <main
        className={`relative w-full bg-light text-dark dark:bg-dark dark:text-light lg:mt-[72px]`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
