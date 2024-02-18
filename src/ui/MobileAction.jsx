import { Link, NavLink } from "react-router-dom";
import { Button, Flex, Box, Center, Grid } from "@chakra-ui/react";

import { FaPencil, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import DynamicFaIcon from "./DynamicFaIcon";
import Avatar from "./Avatar";
import SpinnerFullPage from "./SpinnerFullPage";
import Logout from "../features/auth/Logout";

import { mobileNavLinks } from "../constants/navlink";
import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";

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
            as={Link}
            leftIcon={<FaRightToBracket />}
            to="dang-nhap"
            onClick={onClose}
          >
            Đăng nhập
          </Button>
          <Button
            leftIcon={<FaUserPlus />}
            as={Link}
            to="dang-ky"
            onClick={onClose}
          >
            Đăng ký
          </Button>
        </div>
      ) : (
        <Flex
          direction="column"
          minW="100%"
          justify="center"
          align="center"
          gap={3}
          pb={3}
        >
          <Avatar src={data.avatar} fullName={data.fullName} mobile />

          <Flex gap={2}>
            {level >= EDITOR_LEVEL && (
              <Button as={Link} to="/quan-ly-tin-tuc" variant='outline' fontWeight={500}>
                Quan ly tin tuc
              </Button>
            )}
            {level >= ADMIN_LEVEL && (
              <Button as={Link} to="/control" variant='outline' fontWeight={500}>
                admin panel
              </Button>
            )}
          </Flex>
          <Logout />
        </Flex>
      )}

      {/* links */}
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
