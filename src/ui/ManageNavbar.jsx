import { NavLink } from "react-router-dom";

import {
  Flex,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import Avatar from "./Avatar";

import { useDarkMode } from "../context/DarkModeContext";
import { useAuth } from "../context/UserContext";
import { useLogout } from "../features/auth/useLogout";
import ManageLinks from "./ManageLinks";

function ManageNavbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data } = useAuth();
  const { logout } = useLogout();
  const bg = useColorModeValue("white", "dark");

  return (
    <Flex
      justify="space-between"
      direction="column"
      align="center"
      boxShadow="2xl"
      bg={bg}
    >
      <ManageLinks isDarkMode={isDarkMode} level={data.level} />
      <Flex
        color
        w={50}
        direction="column-reverse"
        justify="end"
        align="center"
        mb={4}
        gap={3}
      >
        <Center>
          <Menu matchWidth>
            <MenuButton>
              <Avatar fullName={data.fullName} avatar={data.avatar} />
            </MenuButton>
            <MenuList fontSize="sm" boxShadow="dark-lg" border={0}>
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
        </Center>
        <Center>
          <Button
            variant="fill"
            size="sm"
            fontSize="16"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <BsMoonStars /> : <BsSun />}
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
}

export default ManageNavbar;
