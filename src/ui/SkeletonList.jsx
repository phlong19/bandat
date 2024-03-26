import {
  Box,
  Skeleton,
  Card,
  SkeletonCircle,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";

function SkeletonList() {
  return (
    <Box maxW="1500px" mx="auto" mt={3}>
      <Flex
        display={{ sm: "flex", lg: "grid" }}
        flexDir="column"
        gridTemplateColumns={{ lg: "repeat(3, 1fr)" }}
        gap={4}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Card minW={160} p={2} key={index}>
            <Skeleton height={100} rounded="md" />
            <SkeletonText py={3}>
              <Flex />
            </SkeletonText>
            <Flex alignItems="center" gap={3} justifyContent="start">
              <Skeleton height={6} minWidth={70} />
              <Skeleton height={6} minWidth={70} />
              <Skeleton height={6} minWidth={70} />
              <Skeleton height={6} minWidth={70} />
            </Flex>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center">
                <SkeletonCircle />
                <Skeleton height={5} minWidth={50} />
              </Flex>
              <Skeleton height={8} width={5} minWidth={150} />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default SkeletonList;
