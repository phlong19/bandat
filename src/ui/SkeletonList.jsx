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
    <Box maxW="1500px" mx="auto" my={3} py={3} px={2}>
      <Flex
        display={{ sm: "flex", lg: "grid" }}
        flexDir="column"
        gridTemplateColumns={{ lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={4}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Card minW={160} p={2.5} key={index} _dark={{ bg: "darker" }}>
            <Skeleton height={100} rounded="md" />
            <SkeletonText py={3}>
              <Flex />
            </SkeletonText>
            <Flex alignItems="center" gap={3} justifyContent="start">
              <Skeleton height={6} minWidth={{ base: 50, lg: "60px" }} />
              <Skeleton height={6} minWidth={{ base: 50, lg: "60px" }} />
              <Skeleton height={6} minWidth={{ base: 50, lg: "60px" }} />
              <Skeleton height={6} minWidth={{ base: 50, lg: "60px" }} />
            </Flex>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              pt={3}
              my={2}
            >
              <Flex alignItems="center" gap={3}>
                <SkeletonCircle />
                <Skeleton
                  height={5}
                  minWidth={{ base: 55, sm: 79, md: 85, xl: 90 }}
                />
              </Flex>
              <Skeleton height={5} minWidth={140} />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default SkeletonList;
