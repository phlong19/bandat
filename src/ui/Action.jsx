import { NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { BiSolidBible } from "react-icons/bi";
import { RiListSettingsLine } from "react-icons/ri";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";
import ChakraPopover from "./ChakraPopover";
import Logout from "../features/auth/Logout";

import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";

function Action({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="flex items-center justify-stretch gap-5">
      <ChakraPopover title="Tin đã lưu">
        <p>hi</p>
      </ChakraPopover>

      <ToggleTheme />
      {!isAuthenticated ? (
        <>
          <Button to={"dang-nhap"} onClick={onClose} variant="light">
            Đăng nhập
          </Button>
          <Button to={"dang-ky"} onClick={onClose} variant="light">
            Đăng ký
          </Button>
        </>
      ) : (
        <div className="flex items-center">
          <ChakraPopover title="Tài khoản" avatar data={data}>
            <div className="flex flex-col gap-2">
              <NavLink
                to="/quan-ly-bai-viet"
                className="flex items-center justify-start gap-2 font-lexend text-lg font-medium transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
              >
                <span className="text-xl">
                  <RiListSettingsLine />
                </span>
                Quản lý bài viết
              </NavLink>
              <NavLink
                to="/tai-khoan"
                className="flex items-center justify-start gap-2 font-lexend text-lg font-medium transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
              >
                <span className="text-xl">
                  <FaCircleUser />
                </span>
                Quản lý tài khoản
              </NavLink>
              {level >= EDITOR_LEVEL && (
                <NavLink
                  to="/quan-ly-tin-tuc"
                  className="flex items-center justify-start gap-2 font-lexend text-lg font-medium transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
                >
                  <span className="text-xl">
                    <FaRegNewspaper />
                  </span>
                  Quản lý tin tức
                </NavLink>
              )}
              {level >= ADMIN_LEVEL && (
                <NavLink
                  to="/control"
                  className="flex items-center justify-start gap-2 font-lexend text-lg font-medium transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
                >
                  <span className="text-xl">
                    <BiSolidBible />
                  </span>
                  Admin Panel
                </NavLink>
              )}
            </div>
            <span className="mt-3 flex w-full items-center justify-center">
              <Logout />
            </span>
          </ChakraPopover>
        </div>
      )}
      <Button to="/dang-tin">Đăng tin</Button>
    </div>
  );
}

export default Action;
