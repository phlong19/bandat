import { Link, NavLink } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";

import { FaDoorOpen, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import Avatar from "./Avatar";
import SpinnerFullPage from "./SpinnerFullPage";
import MobileActionItem from "./MobileActionItem";

import { mobileNavLinks } from "../constants/navlink";
import { useAuth } from "../context/UserContext";
import { useLogout } from "../features/auth/useLogout";

const { base, authen } = mobileNavLinks;

function MobileAction({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();
  const { logout } = useLogout();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  const arr = authen.filter((item) => item.access <= level);

  return (
    <div className="mt-4 overflow-y-auto px-2 text-left">
      {!isAuthenticated ? (
        <div className="flex justify-center gap-3">
          <Button
            colorScheme="green"
            variant="outline"
            as={Link}
            leftIcon={<FaRightToBracket />}
            to="dang-nhap"
            onClick={onClose}
          >
            Đăng nhập
          </Button>
          <Button
            colorScheme="green"
            variant="outline"
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
          <Avatar avatar={data.avatar} fullName={data.fullName} mobile />
          <Text mt={2}>{data.fullName}</Text>
        </Flex>
      )}

      {/* links */}
      <ul className="mt-3">
        {isAuthenticated &&
          arr.map((item) => (
            <li key={item.access} className="relative w-full overflow-hidden">
              <MobileActionItem
                to={item.to}
                title={item.title}
                icon={item.icon}
                onClose={onClose}
              />
            </li>
          ))}
        {base.map((link) => (
          <li key={link.title} className="relative w-full overflow-hidden">
            <MobileActionItem
              to={link.to}
              onClose={onClose}
              title={link.title}
              icon={link.icon}
            />
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <NavLink
              className="flex items-center gap-4 py-3 pl-4 transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
              onClick={logout}
            >
              <span>
                <FaDoorOpen className="text-xl" />
              </span>
              Đăng xuất
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MobileAction;
