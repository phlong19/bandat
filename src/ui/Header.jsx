import { NavLink } from "react-router-dom";

import { navLinks } from "../constants/navlink";
import Action from "./Action";
import Logo from "../ui/Logo";

function Header() {
  return (
    <header className="dark:bg-dark transition-colors sticky left-0 top-0 flex h-24 w-full flex-wrap items-center justify-between bg-white px-4 py-[18px] text-zinc-800 duration-300 dark:text-white">
      <div className="flex items-center">
        <Logo />
        <ul className="flex gap-5 pt-2.5">
          {navLinks.map((link, i) => (
            <li key={i} className="group inline-block pb-2.5">
              <NavLink
                to={link.to}
                className="relative font-medium tracking-wide before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:w-0 before:origin-left before:rounded before:bg-red-400 before:transition-all before:duration-300 before:ease-out before:content-[''] group-hover:before:w-full"
              >
                {link.title}
                <div className="dark:bg-dark absolute mt-2.5 hidden w-64 flex-col gap-1 rounded bg-white px-2 py-3 pt-2 shadow-sm shadow-black group-hover:flex dark:text-white">
                  {link.child_links.map((child, i) => (
                    <NavLink to={`${link.to}/${child.type}`} key={i}>
                      {child.title}
                    </NavLink>
                  ))}
                </div>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              className="relative font-medium tracking-wide before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:w-0 before:origin-left before:rounded before:bg-red-400 before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:w-full"
              to={"du-an"}
            >
              Dự án
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative font-medium tracking-wide before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:w-0 before:origin-left before:rounded before:bg-red-400 before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:w-full"
              to={"tin-tuc"}
            >
              Tin tức
            </NavLink>
          </li>
          <li>
            <NavLink
              className="relative font-medium tracking-wide before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:w-0 before:origin-left before:rounded before:bg-red-400 before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:w-full"
              to={"danh-ba"}
            >
              Danh bạ
            </NavLink>
          </li>
        </ul>
      </div>
      <Action />
    </header>
  );
}

export default Header;
