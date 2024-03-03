import { Box, Center } from "@chakra-ui/react";

import VideoBackgroundWithSearch from "../ui/VideoBackgroundWithSearch";

function Home() {
  return (
    <Box>
      <VideoBackgroundWithSearch />
      {/* stats */}
      <Center bg="red.400" minH={300}>
        number of customers, re post, partner,..
      </Center>
      <Center bg="blue.600" minH={400}>
        benefits
      </Center>
      <Center bg="green.500" minHeight={200}>
        CTA
      </Center>
    </Box>
  );
}

export default Home;
