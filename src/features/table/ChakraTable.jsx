import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
} from "@chakra-ui/react";

function ChakraTable({ title, captions, data, render }) {
  const modeBaseColor = useColorModeValue("primary", "secondary");

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={modeBaseColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={modeBaseColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, i) => {
                return (
                  <Th color="gray.400" key={i} ps={i === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>{data.map(render)}</Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default ChakraTable;
