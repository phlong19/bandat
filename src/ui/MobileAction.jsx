import { FaPencil, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import Button from "./Button";
import DynamicFaIcon from "./DynamicFaIcon";
import { mobileNavLinks } from "../constants/navlink";
import { NavLink } from "react-router-dom";

function MobileAction({ onClose }) {
  return (
    <div className="mt-4 px-2 text-left">
      <div className="flex justify-center gap-3">
        <Button
          icon={<FaRightToBracket />}
          variant="light"
          to="dang-nhap"
          onClick={onClose}
        >
          Đăng nhập
        </Button>
        <Button icon={<FaUserPlus />} to="dang-ky" onClick={onClose}>
          Đăng ký
        </Button>
      </div>
      <div className="mt-3.5 flex w-full items-stretch justify-center">
        <Button variant="light" icon={<FaPencil />} onClick={onClose}>
          Đăng tin
        </Button>
      </div>
      <ul className="mt-3">
        {mobileNavLinks.map((link) => (
          <li key={link.title} className="relative w-full overflow-hidden">
            <NavLink
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-4 py-3 pl-4 text-primary dark:text-secondary"
                  : "flex items-center gap-4 py-3 pl-4"
              }
            >
              <span className="text-3xl">
                <DynamicFaIcon name={link.icon} />
              </span>
              <span>{link.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileAction;
