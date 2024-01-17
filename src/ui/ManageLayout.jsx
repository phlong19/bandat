import { Outlet } from "react-router-dom";

function ManageLayout() {
  // maybe a sidebar ?
  return (
    <div className="w-full h-screen">
      <Outlet />
    </div>
  );
}

export default ManageLayout;
