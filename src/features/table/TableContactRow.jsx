import { Tr, Td, Text, Avatar, Flex } from "@chakra-ui/react";

import { formatDate } from "../../utils/helper";

function TableContactRow({ data }) {
  const { created_at, name, email, phone, title, content, profile } = data;

  return (
    <Tr>
      <Td maxW="250px" title={name}>
        <Text noOfLines={2}>{name}</Text>
      </Td>

      <Td>
        <Text noOfLines={2}>{phone ? phone : "---"}</Text>
      </Td>

      <Td title={email}>
        <Text noOfLines={2}>{email}</Text>
      </Td>
      <Td maxW="250px" title={title}>
        <Text noOfLines={2}>{title}</Text>
      </Td>
      <Td minW={250} title={content}>
        <Text noOfLines={2}>{content}</Text>
      </Td>
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
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
    </Tr>
  );
}

export default TableContactRow;
