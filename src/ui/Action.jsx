import { Link, NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { LiaBibleSolid } from "react-icons/lia";
import { RiListSettingsLine } from "react-icons/ri";
import { BsDoorOpen } from "react-icons/bs";
import { HiOutlineViewGridAdd } from "react-icons/hi";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";
import ChakraPopover from "./ChakraPopover";

import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import { useLogout } from "../features/auth/useLogout";
import BookmarkPopover from "./BookmarkPopover";
import { TbBinaryTree, TbShoppingCart } from "react-icons/tb";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useAppSelector } from "../hooks/redux";

function Action({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();
  const { logout } = useLogout();
  const { count } = useAppSelector((state) => state.cart);

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="mr-2 flex items-center justify-stretch gap-2.5">
      <div className="flex items-center gap-1">
        <ChakraPopover title="Sản phẩm yêu thích">
          <BookmarkPopover />
        </ChakraPopover>

        <ToggleTheme />

        <div className="relative">
          <ChakraButton
            as={Link}
            to="/gio-hang"
            colorScheme="green"
            variant="ghost"
          >
            <TbShoppingCart size={18} />
          </ChakraButton>
          {count > 0 && (
            <p
              className={`${
                count > 9 ? "-right-1 -top-1" : "right-0 top-0"
              } absolute  rounded-full bg-red-500 px-2  py-[1px] text-white`}
            >
              {count > 9 ? "9+" : count}
            </p>
          )}
        </div>
      </div>
      {!isAuthenticated ? (
        <Button to="dang-nhap" onClick={onClose} variant="light">
          Đăng nhập
        </Button>
      ) : (
        <div className="flex items-center">
          <ChakraPopover title="Tài khoản" avatar data={data}>
            <div className="flex flex-col gap-2.5">
              {level > EDITOR_LEVEL && (
                <>
                  <NavLink to="/them-san-pham" className="user-item">
                    <span className="text-xl">
                      <HiOutlineViewGridAdd />
                    </span>
                    Thêm sản phẩm
                  </NavLink>
                  <NavLink to="/quan-ly-san-pham" className="user-item">
                    <span className="text-xl">
                      <RiListSettingsLine />
                    </span>
                    Quản lý sản phẩm
                  </NavLink>
                </>
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
    </div>
  );
}

export default Action;
