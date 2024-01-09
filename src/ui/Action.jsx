import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";

import { useClickOutside } from "../hooks/useClickOutside";
import { NavLink } from "react-router-dom";

function Action() {
  const [show, setShow] = useState(false);

  function close() {
    setShow(false);
  }

  function handleToggle(e) {
    e.stopPropagation();
    show !== true ? setShow(true) : close();
  }

  const ref = useClickOutside(close, false);

  return (
    <div className="flex gap-5">
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
      <NavLink to={"dang-nhap"}>nhap</NavLink>
      <NavLink to={"dang-ky"}>ky</NavLink>
      <NavLink >dang tin</NavLink>
    </div>
  );
}

export default Action;
