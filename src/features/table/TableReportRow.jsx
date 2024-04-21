import {
  Avatar,
  Checkbox,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/helper";

const data = {
  id: 18,
  created_at: "2024-04-11T03:04:22.705434+00:00",
  postID: 144,
  description: "out of touch",
  userID: null,
  otherReport: "",
  name: "phan test final",
  phone: 846134872,
  email: "nguyenvana@gmail.com",
  address: false,
  info: false,
  media: false,
  duplicate: false,
  contact: true,
  exist: true,
  sold: false,
  profile: null,
};

// function TableReportRow({ data }) {
function TableReportRow() {
  const { description, otherReport, profile, created_at, name, phone, email } =
    data;
  const color = useColorModeValue("dark", "light");

  // get type data
  // re - order to consistant display
  let sortedObject = {};
  const sortedKeys = Object.keys(data).sort();

  sortedKeys.forEach((key) => {
    sortedObject[key] = data[key];
  });

  return (
    <Tr>
      <Td minW="180px">
        <Text noOfLines={2}>{name}</Text>
        <Text fontSize="xs" color="gray.400" fontWeight="normal">
          0{phone}
        </Text>
        <Text fontSize="xs" color="gray.400" fontWeight="normal">
          {email}
        </Text>
      </Td>

      {Object.values(sortedObject).map(
        (i, index) =>
          typeof i === "boolean" && (
            <Td key={index}>
              <Checkbox
                rounded="4px"
                isDisabled
                defaultChecked={i}
                borderStyle="solid"
                borderWidth="1px"
                borderColor={color}
              />
            </Td>
          ),
      )}

      <Td maxW="250px" title={otherReport}>
        <Text pb=".5rem" noOfLines={2}>
          {otherReport}
        </Text>
      </Td>
      <Td maxW="250px" title={description}>
        <Text pb=".5rem" noOfLines={2}>
          {description}
        </Text>
      </Td>
      {profile ? (
        <Td
          width={{ sm: "250px" }}
          maxWidth={{ sm: "300px" }}
          justifyContent="center"
        >
          <Flex
            gap={2}
            align="center"
            py=".8rem"
            minWidth="100%"
            flexWrap="nowrap"
            title={profile.fullName}
            cursor="default"
          >
            <Avatar
              size="xs"
              src={profile.avatar}
              name={profile.fullName}
              badge={false}
            />
            <Text fontSize="xs" noOfLines={1}>
              {profile.fullName}
            </Text>
          </Flex>
        </Td>
      ) : (
        <Td>
          <Text fontSize="xs">Không đăng nhập</Text>
        </Td>
      )}
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
    </Tr>
  );
}

export default TableReportRow;
