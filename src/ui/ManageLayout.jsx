import { Outlet } from "react-router-dom";

function ManageLayout() {
  // maybe a sidebar ?
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ManageLayout;
