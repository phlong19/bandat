import { NavLink } from "react-router-dom";

import { Links } from "../constants/navlink";
import Action from "./Action";

function DesktopNav({ navLinks }: { navLinks: Links[] }) {
  return (
    <>
      <ul className="mr-auto flex gap-5 pl-6 pt-3.5">
        {navLinks.map((rootLink) => {
          const hasChild = Number(rootLink.child_links?.length);
          const hasGrandChild = rootLink.child_links?.some(
            (link) => Number(link.child?.length) > 0,
          );

          return (
            <li key={rootLink.type} className="group inline-block pb-2.5">
              <NavLink to={`/danh-muc/${rootLink.type}`} className="nav-link">
                {rootLink.title}
              </NavLink>

              {hasChild > 0 && (
                <ul
                  className={`${
                    hasGrandChild
                      ? "max-w-[50%] grid-cols-3 grid-rows-[auto] gap-4 group-hover:grid"
                      : "w-[300px] flex-col group-hover:flex"
                  } absolute mt-2.5 hidden flex-wrap gap-1 rounded-md border border-dark/50 bg-light px-2 py-3 pt-2 shadow-[8px_5px_15px] shadow-zinc-400 dark:border-white/20 dark:bg-dark dark:text-white`}
                >
                  {rootLink.child_links?.map((child) => (
                    <li key={child.type}>
                      <NavLink
                        to={`/danh-muc/${rootLink.type}/${child.type}`}
                        className="font-semibold transition-colors duration-300 hover:text-primary dark:hover:text-secondary"
                      >
                        {child.title}
                      </NavLink>
                      <ul>
                        {child.child?.map((link) => (
                          <li key={link.type}>
                            <NavLink
                              className="transition-colors duration-300 hover:text-primary dark:hover:text-secondary"
                              to={`/danh-muc/${rootLink.type}/${child.type}/${link.type}`}
                            >
                              {link.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        <li className="group inline-block pb-2.5">
          <NavLink to="/tin-tuc" className="nav-link">
            Tin sức khỏe
          </NavLink>
        </li>
      </ul>

      <Action />
    </>
  );
}

export default DesktopNav;
