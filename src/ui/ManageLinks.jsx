import { NavLink } from "react-router-dom";
import { Image, Flex, Button, Divider, Tooltip } from "@chakra-ui/react";

import { TbBinaryTree, TbNews } from "react-icons/tb";
import { FaFileCirclePlus, FaPills } from "react-icons/fa6";
import { MdOutlineAccountTree } from "react-icons/md";

import { useDarkMode } from "../context/DarkModeContext";
import { ADMIN_LEVEL, EDITOR_LEVEL } from "../constants/anyVariables";
import { BiExtension } from "react-icons/bi";
import { BsBoxes } from "react-icons/bs";

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

      {level >= ADMIN_LEVEL && (
        <>
          <Tooltip label="Thêm sản phẩm">
            <NavLink to="/them-san-pham">
              <Button variant="ghost" m={0}>
                <FaFileCirclePlus fontSize="22" />
              </Button>
            </NavLink>
          </Tooltip>

          <Tooltip label="Quản lý sản phẩm">
            <NavLink to="/quan-ly-san-pham">
              <Button variant="ghost" m={0}>
                <FaPills fontSize="20" />
              </Button>
            </NavLink>
          </Tooltip>
        </>
      )}

      <Divider w="75%" opacity={1} />
      {level >= ADMIN_LEVEL && (
        <>
          <Tooltip label="Quản lý đơn hàng">
            <NavLink to="/quan-ly-don-hang">
              <Button variant="ghost" m={0}>
                <BsBoxes fontSize={22} />
              </Button>
            </NavLink>
          </Tooltip>

          <Tooltip label="Quản lý danh mục">
            <NavLink to="/quan-ly-danh-muc">
              <Button variant="ghost" m={0}>
                <MdOutlineAccountTree fontSize={22} />
              </Button>
            </NavLink>
          </Tooltip>
        </>
      )}

      <Divider w="75%" opacity={1} />
      {level >= EDITOR_LEVEL && (
        <Tooltip label="Quản lý tin tức">
          <NavLink to="/quan-ly-tin-tuc">
            <Button variant="ghost" m={0}>
              <TbNews fontSize={22} />
            </Button>
          </NavLink>
        </Tooltip>
      )}
      <Divider w="75%" opacity={1} />
      {level >= ADMIN_LEVEL && (
        <>
          <Tooltip label="Quản lý tổng hợp">
            <NavLink to="/control">
              <Button variant="ghost" m={0}>
                <BiExtension fontSize="21" />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip label="Quản lý phân quyền">
            <NavLink to="/role-management">
              <Button variant="ghost" m={0}>
                <TbBinaryTree fontSize="21" />
              </Button>
            </NavLink>
          </Tooltip>
        </>
      )}
    </Flex>
  );
}

export default ManageLinks;
