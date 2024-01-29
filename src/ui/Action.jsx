import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { GiQueenCrown } from "react-icons/gi";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import ToggleBox from "./ToggleBox";
import SpinnerFullPage from "./SpinnerFullPage";

import Logout from "../features/auth/Logout";
import { useAuth } from "../context/UserContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";

function Action({ onClose }) {
  const width = window.innerWidth;
  const { data, isAuthenticated, level, isLoading } = useAuth();
  const [childX, setChildX] = useState(0);

  const bookmarkRef = useRef(null);

  // bookmarks box
  const [show, setShow] = useState(false);
  function handleToggle(e) {
    e.stopPropagation();
    const { x } = bookmarkRef.current.getBoundingClientRect();
    setChildX(width - x - 180);

    if (show !== true) {
      setUserToggle(false);
      setShow(true);
    } else {
      setShow(false);
    }
  }

  // user details box
  const [userToggle, setUserToggle] = useState(false);
  function handleUserToggle(e) {
    e.stopPropagation();
    const { x } = bookmarkRef.current.getBoundingClientRect();
    setChildX(width - x - 180);
    if (userToggle !== true) {
      setShow(false);
      setUserToggle(true);
    } else {
      setUserToggle(false);
    }
  }

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return (
    <div className="flex items-center justify-stretch gap-5">
      <span
        ref={bookmarkRef}
        id="bookmark"
        onClick={handleToggle}
        title="Danh sách tin đã lưu"
        className="relative cursor-pointer p-3 text-xl"
      >
        <FaRegHeart />
      </span>
      {show && (
        <ToggleBox childX={childX} close={() => setShow(false)}></ToggleBox>
      )}
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
          <img
            src={data.avatar}
            alt={data.fullName}
            className="relative w-8 cursor-pointer rounded-full border border-dark bg-dark/20 dark:border-white dark:bg-white"
            onClick={handleUserToggle}
          />
          {userToggle && (
            <ToggleBox close={() => setUserToggle(false)} type childX={childX}>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/tai-khoan"
                  className="flex items-center justify-start gap-2 font-lexend text-lg font-medium"
                >
                  <span className="text-xl">
                    <GrUserSettings />
                  </span>
                  Quản lý tài khoản
                </NavLink>
                {level >= EDITOR_LEVEL && (
                  <NavLink
                    to="/quan-ly-tin-tuc"
                    className="flex items-center justify-start gap-2 font-lexend text-lg font-medium"
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
                    className="flex items-center justify-start gap-2 font-lexend text-lg font-medium"
                  >
                    <span className="text-xl">
                      <GiQueenCrown />
                    </span>
                    Admin Panel
                  </NavLink>
                )}
              </div>
              <span className="flex mt-3 w-full items-center justify-center">
                <Logout />
              </span>
            </ToggleBox>
          )}
        </div>
      )}
      <Button to='/dang-tin'>Đăng tin</Button>
    </div>
  );
}

export default Action;
