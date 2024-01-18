import { FaPencil, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import Button from "./Button";
import DynamicFaIcon from "./DynamicFaIcon";
import { mobileNavLinks } from "../constants/navlink";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Logout from "../features/auth/Logout";
import SpinnerFullPage from "./SpinnerFullPage";
import { EDITOR_LEVEL } from "../constants/anyVariables";

function MobileAction({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="mt-4 overflow-y-auto px-2 text-left">
      {!isAuthenticated ? (
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
      ) : (
        <div className="flex w-full flex-col items-center">
          <img
            src={data.avatar}
            alt={data.fullName}
            className="w-1/3 rounded-full bg-dark/20 dark:bg-light"
          />
          <h3 className="pt-5">{level}</h3>
          <Logout />
          {level >= EDITOR_LEVEL && <Button>editor page</Button>}
        </div>
      )}
      <div className="mt-3.5 flex w-full items-stretch justify-center">
        <Button variant="light" icon={<FaPencil />} onClick={onClose}>
          Đăng tin
        </Button>
      </div>
      <ul className="mt-3">
        {isAuthenticated && (
          <li className="relative w-full overflow-hidden">
            <NavLink
              to="/quan-ly-tai-khoan"
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-4 py-3 pl-4 text-primary dark:text-secondary"
                  : "flex items-center gap-4 py-3 pl-4"
              }
            >
              <span className="text-3xl">
                <DynamicFaIcon name="User" />
              </span>
              <span>Quản lý tài khoản</span>
            </NavLink>
          </li>
        )}
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