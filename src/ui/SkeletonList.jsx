import {
  Box,
  Skeleton,
  Card,
  SkeletonCircle,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";

function SkeletonList() {
  return (
    <Box maxW="1500px" mx="auto" my={3} py={3} px={2}>
      <Flex
        display={{ base: "flex", md: "grid" }}
        flexDir="column"
        gridTemplateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {Array.from({ length: LIMIT_PER_PAGE }).map((_, index) => (
          <Card minW={160} p={2.5} key={index} _dark={{ bg: "darker" }}>
            <Skeleton height={100} rounded="md" />
            <SkeletonText py={3}>
              <Flex />
            </SkeletonText>
            <Flex alignItems="center" gap={3} justifyContent="start">
              <Skeleton
                height={6}
                minWidth={{ base: "70px", lg: "42px", xl: "45px" }}
              />
              <Skeleton
                height={6}
                minWidth={{ base: "70px", lg: "42px", xl: "45px" }}
              />
              <Skeleton
                height={6}
                minWidth={{ base: "70px", lg: "42px", xl: "45px" }}
              />
              <Skeleton
                height={6}
                minWidth={{ base: "70px", lg: "42px", xl: "45px" }}
              />
            </Flex>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              pt={3}
              my={2}
            >
              <Flex alignItems="center" w="100%" gap={3}>
                <SkeletonCircle />
                <Skeleton height={5} minWidth={{ base: "75%", xl: 180 }} />
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default SkeletonList;
