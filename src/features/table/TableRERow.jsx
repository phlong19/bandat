import {
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { PiDotsSixVerticalBold, PiUpload } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi";

import { formatDate, getStatusBadgeColor } from "../../utils/helper";
import {
  ADMIN_LEVEL,
  DEFAULT_RE_STATUS,
} from "../../constants/anyVariables";
import { Link } from "react-router-dom";
import { TbEyeCheck } from "react-icons/tb";

function TableRERow({ data, level }) {
  const {
    id,
    created_at,
    purType,
    profile: { phone, avatar, fullName },
    report,
    postStatus: { id: statusID, status },
    address,
    city: { cityName },
    dis: { disName },
    ward: { wardName },
    name,
    slug,
  } = data;

  let statusBadge = getStatusBadgeColor(statusID);

  return (
    <Tr className="group">
      <Td width={{ sm: "250px" }} maxWidth={{ sm: "300px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={avatar} name={fullName} size="md" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              fontWeight="600"
              noOfLines={1}
              minWidth="100%"
              title={fullName}
            >
              {fullName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              0{phone}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          colorScheme={purType === true ? "blue" : "purple"}
          fontSize="sm"
          p="3px 10px"
          borderRadius="lg"
          textTransform="capitalize"
        >
          {purType ? "Ban" : "Cho thue"}
        </Badge>
      </Td>
      {/* name */}
      <Td maxW="250px">
        <Text noOfLines={2}>{name}</Text>
      </Td>
      {/* address */}
      <Td maxW="250">
        <Text noOfLines={2}>
          {address}, {wardName}, {disName},{cityName}
        </Text>
      </Td>
      {/* reports */}
      <Td>
        <Text pl="15px">{report}</Text>
      </Td>
      <Td>
        <Badge
          fontSize="sm"
          p="3px 10px"
          borderRadius="lg"
          colorScheme={statusBadge}
          textTransform="capitalize"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" pb=".5rem">
          {formatDate(created_at, "short")}
        </Text>
      </Td>
      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={25} />
          </MenuButton>
          <MenuList fontSize="medium">
            {level >= ADMIN_LEVEL && statusID === DEFAULT_RE_STATUS && (
              <MenuItem gap={3} color="blue.600">
                <PiUpload />
                Duyệt bài nhanh
              </MenuItem>
            )}
            <MenuItem
              gap={3}
              color="green"
              as={Link}
              to={`/quan-ly-bai-viet/${slug}`}
            >
              {/* future: add edit page */}
              <TbEyeCheck fontSize="20" />
              Xem / Sửa
            </MenuItem>
            <MenuItem gap={3} color="red">
              <HiOutlineTrash />
              Xóa
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableRERow;
