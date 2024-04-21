import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Flex, Box, Heading, useColorModeValue } from "@chakra-ui/react";

import Searchbar from "../features/searchbar/Searchbar";

import { homeText } from "../constants/message";

const sources = ["stock.mp4", "stock2.mp4", "stock3.mp4"];

function VideoBackgroundWithSearch() {
  const [currentVid, setCurrentVid] = useState(sources[0]);
  const [exit, setExit] = useState(false);
  const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.600");

  function handleChangeVid() {
    setExit(true);
    setTimeout(() => {
      setCurrentVid((prev) => {
        const index = sources.findIndex((s) => s === prev);
        if (index > 1) {
          return sources[0];
        }
        return sources[index + 1];
      });
      setExit(false);
    }, 500);
  }

  const videoVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      height="100vh"
      width="100%"
    >
      {/* background */}
      <motion.video
        key={currentVid}
        src={currentVid}
        autoPlay
        muted
        initial="enter"
        animate={exit ? "exit" : "center"}
        variants={videoVariants}
        transition={{ duration: 0.5 }}
        onEnded={handleChangeVid}
        className="absolute h-full w-full object-cover blur-[10px]"
      />

      <Box
        position="absolute"
        bg={bg}
        rounded="lg"
        p={5}
        w={{ base: "80%", lg: "60%" }}
      >
        <Box textAlign="center" mb={{ base: 5, lg: 10 }}>
          <Heading size={{ base: "lg", sm: "xl", lg: "2xl" }} color>
            <TypeAnimation
              sequence={homeText}
              deletionSpeed={60}
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              wrapper="div"
            />
          </Heading>
        </Box>
        <Searchbar />
      </Box>
    </Flex>
  );
}

export default VideoBackgroundWithSearch;
