import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";

import ToggleTheme from "./ToggleTheme";
import Button from "./Button";
import ToggleBox from "./ToggleBox";
import SpinnerFullPage from "./SpinnerFullPage";

import Logout from "../features/auth/Logout";
import { useAuth } from "../context/UserContext";
import { USER_LEVEL } from "../constants/anyVariables";

function Action({ onClose }) {
  const { data, isAuthenticated, level, isLoading } = useAuth();

  // bookmarks box
  const [show, setShow] = useState(false);
  function handleToggle(e) {
    e.stopPropagation();
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
        onClick={handleToggle}
        title="Danh sách tin đã lưu"
        className="relative cursor-pointer p-3 text-xl"
      >
        <FaRegHeart />
      </span>
      {show && <ToggleBox close={() => setShow(false)}>box</ToggleBox>}
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
            <ToggleBox close={() => setUserToggle(false)}>
              {level >= USER_LEVEL && <Button to='/control'>admin panel</Button>}
              <Logout />
            </ToggleBox>
          )}
        </div>
      )}
      <Button>Đăng tin</Button>
    </div>
  );
}

export default Action;
