import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

import { FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import Avatar from "./Avatar";
import SpinnerFullPage from "./SpinnerFullPage";
import Logout from "../features/auth/Logout";
import MobileActionItem from "./MobileActionItem";

import { mobileNavLinks } from "../constants/navlink";
import { useAuth } from "../context/UserContext";

const { base, authen } = mobileNavLinks;

function MobileAction({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  const arr = authen.filter((item) => item.access <= level);

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
          <Logout />
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
      </ul>
    </div>
  );
}

export default MobileAction;
