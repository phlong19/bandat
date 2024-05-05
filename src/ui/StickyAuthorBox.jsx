import { useState } from "react";
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Tooltip,
  Image,
  Link as ChakraLink,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
} from "react-share";
import { Link } from "react-router-dom";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { PiWarning } from "react-icons/pi";

import { hiddenLast3PhoneNum } from "../utils/helper";
import { error, success } from "../constants/message";
import { checkExist, deleteCookie, setCookie } from "../utils/reuse";
import Avatar from "./Avatar";
import ReportModal from "./ReportModal";
import unidecode from "unidecode";
import slugify from "react-slugify";

function StickyAuthorBox({ postID, author }) {
  const { id, phone, fullName, avatar, email } = author;
  const accent = useColorModeValue("primary", "secondary");
  const wb = useColorModeValue("light", "darker");
  const border = useColorModeValue("gray.300", "whiteAlpha.700");

  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const [report, setReport] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const check = checkExist(postID);
  const appId = import.meta.env.VITE_APPID;
  const link = window.location.href;

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
      w={{ base: "full", lg: "130%", xl: "85%" }}
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
        <Text
          as={Link}
          to={`/danh-ba/nguoi-dung/${slugify(unidecode(fullName))}?u=${id}`}
        >
          {fullName}
        </Text>
        <VStack gap={2} my={2} w={{ base: "70%", sm: "40%", lg: "60%" }}>
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
        <HStack py={{ base: 1, md: 3, lg: 3.5 }}>
          {/* fb */}
          <Tooltip label="Chia sẻ lên Facebook">
            <FacebookShareButton url={link}>
              <FacebookIcon
                round
                size={30}
                className="transition-opacity duration-200 hover:opacity-75"
              />
            </FacebookShareButton>
          </Tooltip>
          {/* messenger */}
          <Tooltip label="Chia sẻ qua Messenger">
            <FacebookMessengerShareButton appId={appId} url={link}>
              <Image
                src="/messenger.png"
                boxSize={8}
                className="transition-opacity duration-200 hover:opacity-75"
              />
            </FacebookMessengerShareButton>
          </Tooltip>
          <Tooltip label="Báo xấu">
            <IconButton
              size="sm"
              rounded="full"
              onMouseEnter={() => setReport(true)}
              onMouseLeave={() => setReport(false)}
              color={report ? "#d6ba17f8" : ""}
              icon={<PiWarning />}
              onClick={onOpen}
            />
          </Tooltip>
          <ReportModal isOpen={isOpen} onClose={onClose} postID={postID} />
          <Tooltip label="Lưu vào tin của bạn">
            <IconButton
              size="sm"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              rounded="full"
              icon={hover || check ? <FaHeart fill="red" /> : <FaRegHeart />}
              onClick={() => {
                if (check) {
                  // delete
                  deleteCookie(postID);
                  toast.success(success.removedBookmark);
                } else {
                  const isAdded = setCookie(postID, 14);
                  if (isAdded) {
                    toast.success(success.addedBookmark);
                  } else {
                    toast.error(error.postExist);
                  }
                }
              }}
            />
          </Tooltip>
        </HStack>
      </Center>
    </Box>
  );
}

export default StickyAuthorBox;
