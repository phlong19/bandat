import { Link } from "react-router-dom";
import {
  Tr,
  Td,
  Flex,
  Avatar,
  Text,
  Badge,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";

import { PiDotsSixVerticalBold, PiUpload } from "react-icons/pi";
import { TbEyeCheck } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";

import { ADMIN_LEVEL } from "../../constants/anyVariables";
import { formatDate } from "../../utils/helper";

function TableNewRow({ data, level }) {
  const {
    id,
    created_at,
    profile: { fullName, avatar },
    title,
    slug,
    summary,
    status,
  } = data;

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
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          colorScheme={status ? "green" : "red"}
          fontSize="sm"
          p="3px 10px"
          borderRadius="lg"
          textTransform="capitalize"
        >
          {status ? "Đã duyệt" : "Chưa duyệt"}
        </Badge>
      </Td>
      {/* title */}
      <Td maxW="250px">
        <Text noOfLines={2}>{title}</Text>
      </Td>
      {/* summary */}
      <Td>
        <Text noOfLines={2}>{summary}</Text>
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
            {level >= ADMIN_LEVEL && !status && (
              <MenuItem gap={3} color="blue.600">
                <PiUpload />
                Duyệt bài nhanh
              </MenuItem>
            )}
            <MenuItem gap={3} color="green" as={Link} to={`edit/${slug}`}>
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

export default TableNewRow;
