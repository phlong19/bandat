import { NavLink } from "react-router-dom";

import {
  Flex,
  Button,
  Image,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";

import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { GiQueenCrown } from "react-icons/gi";

import { useDarkMode } from "../context/DarkModeContext";
import { useAuth } from "../context/UserContext";
import { useLogout } from "../features/auth/useLogout";

function ManageNavbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data } = useAuth();
  const { logout } = useLogout();

  return (
    <Flex
      justify="space-between"
      direction="column"
      align="center"
      boxShadow="2xl"
    >
      <Flex direction="column" mt="5" p={0} align="center" gap={2} id="manage_navlink">
        <NavLink to="/" className="mb-2">
          <Image boxSize="30" src="./icon.png" />
        </NavLink>

        <NavLink to="/dang-tin" title="dang tin bds">
          <Button variant="ghost" m={0}>
            <FaRegPenToSquare fontSize="25" />
          </Button>
        </NavLink>
        <NavLink to="/quan-ly-tin-tuc" title="bai viet">
          <Button variant="ghost" m={0}>
            <FaRegNewspaper fontSize="25" />
          </Button>
        </NavLink>
        <NavLink to="/control" title="admin panel">
          <Button variant="ghost" m={0}>
            <GiQueenCrown fontSize="25" />
          </Button>
        </NavLink>
      </Flex>
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
              <Avatar
                name={data.fullName}
                boxShadow="dark-lg"
                size="sm"
                src={data.avatar}
              >
                <AvatarBadge bg="green.500"  boxSize='1em' />
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
        </Center>
        <Center>
          <Button
            variant="fill"
            size="sm"
            fontSize="20"
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
