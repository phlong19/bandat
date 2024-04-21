// libs
import { Avatar, Flex, Badge, Td, Text, Tr } from "@chakra-ui/react";
// others
import { formatDate, getStatusBadgeProfile } from "../../utils/helper";
import { ADMIN_LEVEL, USER_LEVEL } from "../../constants/anyVariables";

function TableUserRow({ data }) {
  const {
    level,
    created_at,
    sex,
    birthday,
    email,
    phone,
    avatar,
    fullName,
    address,
    city,
    dis,
    ward,
  } = data;

  let color = getStatusBadgeProfile(level);

  return (
    <Tr className="group">
      <Td width={{ sm: "230px" }} maxWidth={{ sm: "300px" }} pl="0px">
        {/* avatar */}
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

      <Td maxW="170">
        <Text fontSize="sm" noOfLines={1} title={email}>
          {email}
        </Text>
      </Td>

      <Td>
        <Badge
          colorScheme={color}
          fontSize="xs"
          p="3px 10px"
          borderRadius="lg"
          textTransform="capitalize"
        >
          {level === USER_LEVEL
            ? "User"
            : level === ADMIN_LEVEL
              ? "Admin"
              : "Editor"}
        </Badge>
      </Td>

      {/* address */}
      <Td maxW="250">
        {city?.cityName || address ? (
          <Text noOfLines={2}>
            {address ? `${address}, ` : ""}
            {ward?.wardName ? `${ward.wardName}, ` : ""}
            {dis?.disName ? `${dis.disName}, ` : ""}
            {city.cityName}
          </Text>
        ) : (
          "---"
        )}
      </Td>
      {/* sex */}
      <Td>
        <Text pl="15px">{sex !== null ? (sex ? "Nam" : "Nữ") : "---"}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{birthday ? formatDate(birthday) : "---"}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
    </Tr>
  );
}

export default TableUserRow;
