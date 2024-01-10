import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

import Button from "../ui/Button";

import { useClickOutside } from "../hooks/useClickOutside";
import { useDarkMode } from "../context/DarkModeContext";

function Action() {
  const [show, setShow] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  function close() {
    setShow(false);
  }

  function handleToggle(e) {
    e.stopPropagation();
    show !== true ? setShow(true) : close();
  }

  const ref = useClickOutside(close, false);

  return (
    <div className="flex items-center justify-stretch gap-5">
      <span
        onClick={handleToggle}
        title="Danh sách tin đã lưu"
        className="relative cursor-pointer p-4 text-xl"
      >
        <FaRegHeart />
      </span>
      {show && (
        <div ref={ref} className="fixed top-36">
          box
        </div>
      )}
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? (
          <span className="text-lg">
            <BsFillMoonStarsFill />
          </span>
        ) : (
          <span className="text-lg">
            <BsFillSunFill />
          </span>
        )}
      </Button>
      <Button to={"dang-nhap"}>nhap</Button>
      <Button to={"dang-ky"}>ky</Button>
      <Button>dang tin</Button>
    </div>
  );
}

export default Action;
