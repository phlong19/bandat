import { Spinner, Box, Center, Flex, Text } from "@chakra-ui/react";

import ListItem from "../features/list/ListItem";

function RelatedPosts({ data, isLoading, author = true }) {
  return isLoading ? (
    <Center minH={300}>
      <Spinner size="md" />
    </Center>
  ) : data.length > 0 ? (
    <Flex w="full" overflowX="auto" gap={2} py={2}>
      {data.map((i) => (
        <Box key={i.id} minW={300} maxW={300} w={300}>
          <ListItem key={i.id} data={i} purType={i.purType} author={author} />
        </Box>
      ))}
    </Flex>
  ) : (
    <Center minH={100}>
      <Text>Không có bài viết liên quan cùng khu vực</Text>
    </Center>
  );
}

export default RelatedPosts;
