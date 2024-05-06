import { Container, Text, Center, Box, SimpleGrid } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const statData = [
  {
    label: "Người dùng hoạt động",
    score: "1tr+",
  },
  {
    label: "Bài đăng BĐS",
    score: "12k+",
  },
  {
    label: "Số BĐS giao dịch thành công",
    score: "1k+",
  },
  {
    label: "Số tin tức đã đăng tải",
    score: "500+",
  },
];

function StatsCard() {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Box textAlign="center">
          <Text fontWeight="extrabold" fontSize="x-large" mb={2}>
            <Box as="span" display="inline-block" position="relative">
              LandHub
              <Box
                as="span"
                display="block"
                position="absolute"
                bg={"green.500"}
                w={"100%"}
                h={"1px"}
              />
            </Box>
          </Text>
          <Text>Được tin dùng bởi nhà môi giới và doanh nghiệp</Text>
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
            <StatScore score={data.score} />
            <Text fontSize="sm">{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default StatsCard;

function StatScore({ score }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.p
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        scale: isInView ? 1 : 0,
      }}
      ref={ref}
      className="text-[32px] font-extrabold"
    >
      {score}
    </motion.p>
  );
}
