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

function TableRERow({ data, level, userID }) {
  const {
    id,
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
          {purType ? "Bán" : "Cho thuê"}
        </Badge>
      </Td>

      <Td>
        <Text fontSize="sm">{type.name}</Text>
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
          <MenuActionRE
            authorID={authorID}
            postID={id}
            slug={slug}
            statusID={statusID}
            userID={userID}
            level={level}
          />
        </Menu>
      </Td>
    </Tr>
  );
}

export default TableRERow;
