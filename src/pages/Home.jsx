import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Flex, Box, Heading } from "@chakra-ui/react";

import Searchbar from "../features/searchbar/Searchbar";

import { homeText } from "../constants/message";

const sources = ["stock.mp4", "stock2.mp4"];

function Home() {
  const [currentVid, setCurrentVid] = useState(sources[0]);
  const [exit, setExit] = useState(false);

  function handleChangeVid() {
    setExit(true);
    setTimeout(() => {
      setCurrentVid((prev) => (prev === sources[0] ? sources[1] : sources[0]));
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
      height="70vh"
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
        className="absolute h-full w-full object-cover"
      />
      <Box position="absolute" bg="whiteAlpha.900" rounded="lg" p={5} w="60%">
        <Box textAlign="center" mb={10}>
          <Heading size="3xl" color="dark">
            <TypeAnimation
              sequence={homeText}
              deletionSpeed={70}
              speed={{ type: "keyStrokeDelayInMs", value: 100 }}
              repeat={Infinity}
              wrapper="div"
            />
          </Heading>
        </Box>
        <Searchbar home />
      </Box>
    </Flex>
  );
}

export default Home;
