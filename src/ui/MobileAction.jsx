import { FaPencil, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import Button from "./Button";
import DynamicFaIcon from "./DynamicFaIcon";
import { mobileNavLinks } from "../constants/navlink";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Logout from "../features/auth/Logout";
import SpinnerFullPage from "./SpinnerFullPage";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import Avatar from "./Avatar";
import { Flex, Box, Center } from "@chakra-ui/react";

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
        <Flex
          direction="column"
          minW="100%"
          justify="center"
          align="center"
          gap={3}
          pb={3}
        >
          <Avatar src={data.avatar} fullName={data.fullName} mobile />
          {/* fix later */}
          <Logout />

          {level >= EDITOR_LEVEL && (
            <Button to="/quan-ly-tin-tuc">Quan ly tin tuc</Button>
          )}
          {level >= ADMIN_LEVEL && <Button to="/control">admin panel</Button>}
        </Flex>
      )}
      <Box>
        <Center>
          <Button
            variant="light"
            to="/dang-tin"
            icon={<FaPencil />}
            onClick={onClose}
          >
            Đăng tin
          </Button>
        </Center>
      </Box>
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
