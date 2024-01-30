import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { GiQueenCrown } from "react-icons/gi";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";

import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";

import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import { TbLogout2 } from "react-icons/tb";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { useLogout } from "../features/auth/useLogout";

function Action({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();
  const { logout } = useLogout();

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="flex items-center justify-stretch gap-5">
      <Menu title="Danh sách tin đã lưu">
        <MenuButton>
          <FaRegHeart fontSize={18} />
        </MenuButton>
        <MenuList>
          <MenuItem>hi</MenuItem>
          <MenuItem>ha</MenuItem>
          <MenuItem>ho</MenuItem>
        </MenuList>
      </Menu>

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
        <Menu boundary="body" matchWidth>
          <MenuButton>
            <Avatar
              name={data.fullName}
              boxShadow="dark-lg"
              size="sm"
              src={data.avatar}
            >
              <AvatarBadge bg="blue.500" boxSize="1.5em" m={0}>
                {/* if user has verified account */}
                <span className="p-[1.5px] text-[10px]">✔</span>
              </AvatarBadge>
            </Avatar>
          </MenuButton>
          <MenuList fontSize="18" boxShadow="dark-lg" border={0}>
            <MenuItem
              icon={<HiOutlineCog8Tooth fontSize="16" />}
              as={NavLink}
              to="/tai-khoan"
            >
              Quản lý tài khoản
            </MenuItem>
            <MenuItem
              icon={<TbLogout2 fontSize="16" />}
              onClick={() => logout()}
            >
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <Button to="/dang-tin">Đăng tin</Button>
    </div>
  );
}

export default Action;
