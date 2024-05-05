import { Container, Text, Center, Box, SimpleGrid } from "@chakra-ui/react";

const statData = [
  {
    label: "Số người đăng ký",
    score: "10+",
  },
  {
    label: "Số bài đăng đã được đăng tải",
    score: "120+",
  },
  {
    label: "Số căn nhà đã được giao dịch thành công",
    score: "10+",
  },
  {
    label: "Số lượng tin tức đã được đăng tải",
    score: "10+",
  },
];

function StatsCard() {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Box textAlign="center">
          <Text fontWeight="extrabold" fontSize="x-large" mb={2}>
            <Box as="span" display="inline-block" position="relative">
              Được tin dùng bởi nhà môi giới và doanh nghiệp
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
          LandHub 
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
