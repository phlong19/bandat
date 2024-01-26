import { Outlet } from "react-router-dom";
import Logo from "./Logo";

function AuthenticationLayout() {
  return (
    
    <div className="flex flex-col relative min-h-screen max-h-screen w-full items-center justify-center text-black dark:text-white bg-light dark:bg-dark">
      <div className="scale-150">
        <Logo/>
      </div>
      <Outlet />
    </div>
  
  );
}

export default AuthenticationLayout;
