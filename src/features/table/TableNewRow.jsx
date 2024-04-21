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

import ChakraMenuItemDialog from "../../ui/ChakraMenuItemDialog";
import { PiDotsSixVerticalBold, PiDownload, PiUpload } from "react-icons/pi";
import { TbEyeCheck } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";

import { ADMIN_LEVEL } from "../../constants/anyVariables";
import { formatDate } from "../../utils/helper";

import { useApproveNews } from "./useApproveNews";
import { useDeactiveNews } from "./useDeactiveNews";
import { useDeleteNews } from "./useDeleteNews";
import { useAuth } from "../../context/UserContext";

function TableNewRow({ data, setSlug }) {
  const {
    data: { id: userID },
    level,
  } = useAuth();

  const {
    id,
    created_at,
    userID: authorID,
    author: { fullName, avatar },
    title,
    slug,
    summary,
    status,
  } = data;

  const { approved } = useApproveNews();
  const { deactive } = useDeactiveNews();
  const { deleted } = useDeleteNews();

  return (
    <Tr className="group">
      <Td width={{ sm: "250px" }} maxWidth={{ sm: "300px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={avatar} name={fullName} me="18px" />
          <Flex direction="column">
            <Text
              fontSize="sm"
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
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          textTransform="capitalize"
        >
          {status ? "Đã duyệt" : "Chưa duyệt"}
        </Badge>
      </Td>
      {/* title */}
      <Td maxW="600px" title={title}>
        <Text noOfLines={2}>{title}</Text>
      </Td>
      {/* summary */}
      <Td title={summary}>
        <Text noOfLines={2}>{summary}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuList fontSize="medium">
            {level >= ADMIN_LEVEL && !status && (
              <ChakraMenuItemDialog
                color="blue.600"
                action="Duyệt bài nhanh"
                icon={<PiUpload />}
                onAction={() => approved(id)}
              />
            )}
            {/* must be admin or author to de-active news */}
            {(level >= ADMIN_LEVEL || userID === authorID) && status && (
              <ChakraMenuItemDialog
                color="red.600"
                action="Gỡ bài viết"
                icon={<PiDownload />}
                onAction={() => deactive(id)}
                warning
              />
            )}
            <MenuItem gap={3} color="green" onClick={() => setSlug(slug)}>
              <TbEyeCheck fontSize="20" />
              Xem / Sửa
            </MenuItem>
            <ChakraMenuItemDialog
              color="red"
              action="Xóa"
              warning
              icon={<HiOutlineTrash />}
              onAction={() => deleted(id, level, userID)}
            />
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableNewRow;
