import { Container, Text, Center, Box, SimpleGrid } from "@chakra-ui/react";

const statData = [
  {
    label: "Weekly downloads",
    score: "3.2M",
  },
  {
    label: "Stars on GitHub",
    score: "77k",
  },
  {
    label: "Contributors",
    score: "2.4k",
  },
  {
    label: "Followers on Twitter",
    score: "17k",
  },
];

function StatsCard() {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Box textAlign="center">
          <Text fontWeight="extrabold" fontSize="x-large" mb={2}>
            <Box as="span" display="inline-block" position="relative">
              Trusted by Developers
              <Box
                as="span"
                display="block"
                position="absolute"
                bg={"blue.600"}
                w={"100%"}
                h={"1px"}
              />
            </Box>
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </Box>
      </Center>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={{ base: 2, sm: 5 }}
        mt={12}
        mb={4}
      >
        {statData.map((data, i) => (
          <Box key={i} p={{ base: 2, sm: 5 }} textAlign="center">
            <Text fontWeight="extrabold" fontSize="xx-large">
              {data.score}
            </Text>
            <Text fontSize="sm">{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default StatsCard;
