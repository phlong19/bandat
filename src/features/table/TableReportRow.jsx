import { Checkbox, Td, Text, Tr } from "@chakra-ui/react";
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
  const { created_at, name, phone, email } = data;

  return (
    <Tr>
      <Td minW="180px">
        <Text noOfLines={2}>{name}</Text>
        <Text fontSize="xs" color="gray.400" fontWeight="normal">
          0{phone}
        </Text>
      </Td>
{/* TODO */}
      <Td maxW="250px">
        <Text noOfLines={2}>{email}</Text>
      </Td>
      {Object.values(data).map(
        (i) =>
          typeof i === "boolean" && (
            <Td key={i}>
              <Checkbox>{i}</Checkbox>
            </Td>
          ),
      )}
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
    </Tr>
  );
}

export default TableReportRow;
