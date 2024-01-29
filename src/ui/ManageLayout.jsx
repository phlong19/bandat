import { Outlet } from "react-router-dom";
import ManageNavbar from "./ManageNavbar";

function ManageLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default ManageLayout;
