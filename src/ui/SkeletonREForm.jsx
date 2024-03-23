import { Skeleton, VStack, Box, Grid } from "@chakra-ui/react";
import ChakraBreadcrumb from "./ChakraBreadcrumb";

function SkeletonREForm({ activePage }) {
  return (
    <>
      <ChakraBreadcrumb page={activePage} />
      <Box gap={12} display="flex" flexDir="column" w="85%" mx="auto">
        <Skeleton h={16} mt={14} />

        <VStack gap={10} my={2}>
          {/* purType & re type */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} w="100%">
            <Skeleton h="30px" />
            <Skeleton h="30px" />
          </Grid>
          {/* address */}
          <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
            <Skeleton h="35px" />
            <Skeleton h="35px" />
            <Skeleton h="35px" />
          </Grid>
          {/* address - details */}
          <Box w="100%" mt={3}>
            <Skeleton h="40px" />
          </Box>
          {/* title */}
          <Box w="100%" mt={5}>
            <Skeleton h="60px" />
          </Box>
          {/* 1 */}
          {/* area & price */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} w="100%">
            <Skeleton h="35px" />
            <Skeleton h="35px" />
          </Grid>

          {/* documents */}
          <Box w="100%" mt={-3}>
            <Skeleton h="40px" />
          </Box>

          {/* other fields */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={2} w="100%">
            <Skeleton h="40px" />
            <Skeleton h="40px" />
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={2} w="100%">
            <Skeleton h="40px" />
            <Skeleton h="40px" />
          </Grid>
          <Box mr="auto" w="40%" mt={-6}>
            <Skeleton h="20px" />
          </Box>
          {/* des */}
          <Box w="100%" mt={-2.5}>
            <Skeleton h={40} />
          </Box>
        </VStack>
      </Box>
    </>
  );
}

export default SkeletonREForm;
