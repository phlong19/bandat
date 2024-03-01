import { Box } from "@chakra-ui/react";

import VideoBackgroundWithSearch from "../ui/VideoBackgroundWithSearch";

function Home() {
  return (
    <Box>
      <VideoBackgroundWithSearch />
      {/* stats */}
      <Box bg="red.400" minH={300}>
        number of customers, re post, partner,..
      </Box>
      <Box bg="blue.600" minH={400}>
        benefits
      </Box>
      <Box bg="green.500" minHeight={200}>
        CTA
      </Box>
    </Box>
  );
}

export default Home;
