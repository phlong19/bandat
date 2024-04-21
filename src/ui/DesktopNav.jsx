import { NavLink } from "react-router-dom";

import { navLinks } from "../constants/navlink";
import Action from "./Action";

function DesktopNav() {
  return (
    <>
      <ul className="mr-auto flex gap-5 pl-6 pt-3.5">
        {navLinks.map((link, i) => (
          <li key={i} className="group inline-block pb-2.5">
            <NavLink to={link.to} className="nav-link">
              {link.title}
              <div className="absolute mt-2.5 hidden w-[300px] flex-col gap-1 rounded bg-light px-2 py-3 pt-2 shadow-sm shadow-black group-hover:flex dark:bg-dark dark:text-white">
                {link.child_links.map((child, i) => (
                  <NavLink
                    to={`${link.to}/${child.type}`}
                    className="transition-colors duration-300 hover:text-primary dark:hover:text-secondary"
                    key={i}
                  >
                    {child.title}
                  </NavLink>
                ))}
              </div>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink className="nav-link" to={"tin-tuc"}>
            Tin tức
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to={"danh-ba"}>
            Danh bạ
          </NavLink>
        </li>
      </ul>

      <Action />
    </>
  );
}

export default DesktopNav;
