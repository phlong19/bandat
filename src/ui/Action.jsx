import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { LiaBibleSolid } from "react-icons/lia";
import { RiListSettingsLine } from "react-icons/ri";
import { BsDoorOpen } from "react-icons/bs";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";
import ChakraPopover from "./ChakraPopover";

import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import { useLogout } from "../features/auth/useLogout";
import BookmarkPopover from "./BookmarkPopover";
import { TbBinaryTree } from "react-icons/tb";

function Action({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();
  const { logout } = useLogout();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="flex items-center justify-stretch gap-2.5">
      <div>
        <ChakraPopover title="Tin đã lưu">
          <BookmarkPopover />
        </ChakraPopover>

        <ToggleTheme />
      </div>
      {!isAuthenticated ? (
        <>
          <Button to="dang-nhap" onClick={onClose} variant="light">
            Đăng nhập
          </Button>
          <Button to="dang-ky" onClick={onClose} variant="light">
            Đăng ký
          </Button>
        </>
      ) : (
        <div className="flex items-center">
          <ChakraPopover title="Tài khoản" avatar data={data}>
            <div className="flex flex-col gap-2.5">
              {level != EDITOR_LEVEL && (
                <NavLink to="/quan-ly-bai-viet" className="user-item">
                  <span className="text-xl">
                    <RiListSettingsLine />
                  </span>
                  Quản lý bài viết
                </NavLink>
              )}
              <NavLink to="/tai-khoan" className="user-item">
                <span className="text-xl">
                  <FaRegCircleUser />
                </span>
                Quản lý tài khoản
              </NavLink>
              {level >= EDITOR_LEVEL && (
                <NavLink to="/quan-ly-tin-tuc" className="user-item">
                  <span className="text-xl">
                    <FaRegNewspaper />
                  </span>
                  Quản lý tin tức
                </NavLink>
              )}
              {level >= ADMIN_LEVEL && (
                <>
                  <NavLink to="/control" className="user-item">
                    <span className="text-xl">
                      <LiaBibleSolid />
                    </span>
                    Admin Panel
                  </NavLink>

                  <NavLink to="/role-management" className="user-item">
                    <span className="text-xl">
                      <TbBinaryTree />
                    </span>
                    Phân quyền tài khoản
                  </NavLink>
                </>
              )}
              <NavLink onClick={logout} className="user-item">
                <span className="text-xl">
                  <BsDoorOpen />
                </span>
                Đăng xuất
              </NavLink>
            </div>
          </ChakraPopover>
        </div>
      )}
      <Button to="/dang-tin">Đăng tin</Button>
    </div>
  );
}

export default Action;
