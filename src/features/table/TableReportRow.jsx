import { Checkbox, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
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
  const color = useColorModeValue("dark", "light");

  // get type data
  // re - order to consistant display
  const types = Object.values(data).filter((i) => typeof i === "boolean");

  console.log(types);
  // TODO
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
      {types.map(
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
      <Td>
        <Text pb=".5rem">{formatDate(created_at)}</Text>
      </Td>
    </Tr>
  );
}

export default TableReportRow;
