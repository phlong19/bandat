// libs
import {
  Avatar,
  Badge,
  Menu,
  MenuButton,
  Flex,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

// icons + ui
import MenuActionRE from "./MenuActionRE";
import { PiDotsSixVerticalBold } from "react-icons/pi";

// others
import { formatDate, getStatusBadgeColor } from "../../utils/helper";
import { SOLD_STATUS } from "../../constants/anyVariables";

function TableRERow({ data, level, userID }) {
  const {
    id,
    name,
    expriryDate,
    created_at,
    purType,
    profile: { id: authorID, phone, avatar, fullName },
    report,
    type,
    postStatus: { id: statusID, status },
    address,
    city: { cityName },
    dis: { disName },
    ward: { wardName },
    slug,
  } = data;

  let statusBadge = getStatusBadgeColor(statusID);

  return (
    <Tr className="group">
      <Td width={{ sm: "230px" }} maxWidth={{ sm: "300px" }} pl="0px">
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
            <Text fontSize="xs" color="gray.400" fontWeight="normal">
              0{phone}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          colorScheme={purType === true ? "blue" : "purple"}
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          textTransform="capitalize"
        >
          {purType ? "Bán" : "Cho thuê"}
        </Badge>
      </Td>

      <Td>
        <Text fontSize="sm">{type.name}</Text>
      </Td>
      <Td maxW={250} title={name}>
        <Text noOfLines={2}>{name}</Text>
      </Td>
      {/* address */}
      <Td maxW="250" title={`${address}, ${wardName}, ${disName},${cityName}`}>
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
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          colorScheme={statusBadge}
          textTransform="capitalize"
        >
          {statusID == SOLD_STATUS && !purType ? "Đã thuê" : status}
        </Badge>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{expriryDate ? formatDate(expriryDate) : "---"}</Text>
      </Td>
      <Td>
        <Menu>
          <MenuButton className="invisible rounded-md border border-dark p-1 group-hover:visible dark:border-white">
            <PiDotsSixVerticalBold fontSize={18} />
          </MenuButton>
          <MenuActionRE
            authorID={authorID}
            postID={id}
            slug={slug}
            statusID={statusID}
            userID={userID}
            level={level}
            purType={purType}
          />
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableRERow;
