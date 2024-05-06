import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Divider } from "@chakra-ui/react";

import { TbBinaryTree, TbNews, TbTableOptions } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { useDarkMode } from "../context/DarkModeContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import { BiExtension } from "react-icons/bi";

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

      {level != EDITOR_LEVEL && (
        <>
          <NavLink to="/dang-tin" title="Đăng tin BĐS">
            <Button variant="ghost" m={0}>
              <HiOutlinePencilAlt fontSize="22" />
            </Button>
          </NavLink>

          <NavLink to="/quan-ly-bai-viet" title="Quản lý bài viết BĐS">
            <Button variant="ghost" m={0}>
              <TbTableOptions fontSize="20" />
            </Button>
          </NavLink>
        </>
      )}

      <Divider w="75%" opacity={1} />
      {level >= EDITOR_LEVEL && (
        <NavLink to="/quan-ly-tin-tuc" title="Quản lý tin tức">
          <Button variant="ghost" m={0}>
            <TbNews fontSize={22} />
          </Button>
        </NavLink>
      )}
      <Divider w="75%" opacity={1} />
      {level >= ADMIN_LEVEL && (
        <>
          <NavLink to="/control" title="Quản lý tổng hợp">
            <Button variant="ghost" m={0}>
              <BiExtension fontSize="21" />
            </Button>
          </NavLink>
          <NavLink to="/role-management" title="Quản lý phân quyền">
            <Button variant="ghost" m={0}>
              <TbBinaryTree fontSize="21" />
            </Button>
          </NavLink>
        </>
      )}
    </Flex>
  );
}

export default ManageLinks;
