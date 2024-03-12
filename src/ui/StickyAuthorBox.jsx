import { useState } from "react";
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Image,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "react-share";

import Avatar from "./Avatar";
import { hiddenLast3PhoneNum } from "../utils/helper";
import { success } from "../constants/message";
import { TbShare } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { PiWarning } from "react-icons/pi";
import { RiFacebookCircleFill } from "react-icons/ri";

function StickyAuthorBox({ author }) {
  const { phone, fullName, avatar, email } = author;
  const accent = useColorModeValue("primary", "secondary");
  const wb = useColorModeValue("light", "darker");
  const border = useColorModeValue("gray.200", "whiteAlpha.700");

  const [show, setShow] = useState(false);

  async function handleClick(e) {
    e.stopPropagation();
    if (show) {
      await navigator.clipboard.writeText(`0${phone}`);
      toast.success(success.copyToClipboard);
    } else {
      setShow(true);
    }
  }

  return (
    <Box
      position={{ base: "relative", lg: "sticky" }}
      top={20}
      w={{ base: "full", lg: "70%" }}
      border="1px solid transparent"
      borderColor={border}
      rounded="md"
      p={2}
      py={3}
      mt={1}
      pos="sticky"
      h={{ base: "fit-content", md: "100%" }}
    >
      <Center flexDir="column">
        <Avatar avatar={avatar} fullName={fullName} mobile badge={false} />
        <Text size="xs" color="gray.400" pt={3} fontFamily="roboto">
          Được đăng bởi
        </Text>
        <Text>{fullName}</Text>
        <VStack gap={2} my={2} w="60%">
          <Button
            bg={accent}
            color={wb}
            w="full"
            _hover={{ opacity: 0.85 }}
            fontSize="sm"
            title={show ? "Nhấn để sao chép" : "Nhấn để hiển thị"}
            onClick={(e) => handleClick(e)}
          >
            {show ? "0" + phone : hiddenLast3PhoneNum(phone)}
          </Button>
          {/* zalo chat */}
          <Button
            leftIcon={<Image src="/zalo.png" h="16px" w="20px" />}
            w="full"
            variant="outline"
            fontWeight={500}
            fontSize="sm"
            as={ChakraLink}
            _hover={{
              textDecor: "none",
              _light: { bg: "gray.200" },
              _dark: { bg: "whiteAlpha.200" },
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://chat.zalo.me/?phone=0${phone}`);
            }}
          >
            Chat qua Zalo
          </Button>
          {/* email */}
          <Button
            fontSize="sm"
            w="full"
            _hover={{
              textDecor: "none",
              _light: { bg: "gray.200" },
              _dark: { bg: "whiteAlpha.200" },
            }}
            variant="outline"
            fontWeight={500}
            as={ChakraLink}
            href={`mailto:${email}`}
          >
            Gửi email
          </Button>
        </VStack>
      </Center>
      {/* buttons */}
      <Center>
        <HStack py={2}>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon
              round
              size={38}
              className="transition-opacity duration-200 hover:opacity-75"
            />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={window.location.href}>
            {/* <FacebookMessengerIcon
              size={36}
              round
              className="transition-opacity duration-200 hover:opacity-75"
            /> */}
            <Image
              src="/messenger.png"
              boxSize={10}
              className="transition-opacity duration-200 hover:opacity-75"
            />
          </FacebookMessengerShareButton>
          <IconButton rounded="full" icon={<PiWarning />} title="Báo xấu" />
          <IconButton
            rounded="full"
            icon={<FaRegHeart />}
            title="Lưu vào tin"
          />
        </HStack>
      </Center>
    </Box>
  );
}

export default StickyAuthorBox;
