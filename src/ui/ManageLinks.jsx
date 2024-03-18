import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Divider } from "@chakra-ui/react";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiQueenCrown } from "react-icons/gi";

import { useDarkMode } from "../context/DarkModeContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";

function ManageLinks({ level }) {
  const { isDarkMode } = useDarkMode();

  return (
    <Flex
      direction="column"
      mt="5"
      p={0}
      align="center"
      gap={2}
      id="manage_navlink"
    >
      {/* logo */}
      <NavLink to="/" className="mb-2">
        <Image
          boxSize="30"
          src={isDarkMode ? "/micon-light.png" : "/micon-dark.png"}
        />
      </NavLink>

      <NavLink to="/dang-tin" title="Đăng tin BĐS">
        <Button variant="ghost" m={0}>
          <FaRegPenToSquare fontSize="22" />
        </Button>
      </NavLink>

      <NavLink to="/quan-ly-bai-viet" title="Quản lý bài viết BĐS">
        <Button variant="ghost" m={0}>
          <FaRegNewspaper fontSize="22" />
        </Button>
      </NavLink>

      <Divider w="75%" opacity={1} />
      {level >= EDITOR_LEVEL && (
        <NavLink to="/quan-ly-tin-tuc" title="Quản lý tin tức">
          <Button variant="ghost" m={0}>
            <HiOutlineClipboardDocumentList fontSize={22} />
          </Button>
        </NavLink>
      )}
      <Divider w="75%" opacity={1} />
      {level >= ADMIN_LEVEL && (
        <>
          <NavLink to="/control" title="admin panel">
            <Button variant="ghost" m={0}>
              <GiQueenCrown fontSize="22" />
            </Button>
          </NavLink>
          <NavLink to="/control" title="admin panel">
            <Button variant="ghost" m={0}>
              <GiQueenCrown fontSize="22" />
            </Button>
          </NavLink>
          <NavLink to="/control" title="admin panel">
            <Button variant="ghost" m={0}>
              <GiQueenCrown fontSize="22" />
            </Button>
          </NavLink>
        </>
      )}
    </Flex>
  );
}

export default ManageLinks;
