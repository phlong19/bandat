import { Outlet } from "react-router-dom";
import Header from './Header'

function AuthenticationLayout() {
  return (
    <>
    <Header />
    <div className="flex h-[calc(100vh-72px)] lg:h-[calc(100vh-96px)] w-full items-center justify-center text-black dark:text-white bg-light dark:bg-dark">
      <Outlet />
    </div>
    </>
  );
}

export default AuthenticationLayout;
