import { Outlet } from "react-router-dom";

import Header from '../ui/Header'
import Footer from '../ui/Footer'

function AppLayout() {
  return (
    <div className="">
      <Header />
      <main className="min-h-[4000px] bg-green-300 w-full">
        <Outlet />
      </main>
     <Footer />
    </div>
  );
}

export default AppLayout;
