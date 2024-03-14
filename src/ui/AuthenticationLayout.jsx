import { Outlet } from "react-router-dom";

function AuthenticationLayout() {
  return (
    <div className="relative flex max-h-screen min-h-screen w-full flex-col items-center justify-center bg-light text-black dark:bg-dark dark:text-white">
      <Outlet />
    </div>
  );
}

export default AuthenticationLayout;
