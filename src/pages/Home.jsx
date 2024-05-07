import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  SimpleGrid,
  Heading,
  Input,
  Flex,
  Image,
  FormControl,
  VStack,
  FormLabel,
  FormErrorMessage,
  Button,
  Textarea,
  useColorModeValue,
  StackDivider,
  Icon,
  createIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";

import VideoBackgroundWithSearch from "../ui/VideoBackgroundWithSearch";
import StatsCard from "../ui/StatsCard";
import Features from "../ui/Features";
import Testimonials from "../ui/Testimonials";

import { FaChalkboardUser, FaRegPaperPlane } from "react-icons/fa6";
import validator from "validator";
import { useForm } from "react-hook-form";
import { createContact } from "../services/apiGeneral";
import { useAuth } from "../context/UserContext";
import { motion } from "framer-motion";
import { TbTool } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";

const variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 20,
    rotate: -9,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1.5,
    },
  },
};

const containerStoryVar = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const storyVar = {
  offscreen: {
    x: -70,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

function Home() {
  const { data: profile, isLoading } = useAuth();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [email, setEmail] = useState(null);
  const { colorMode } = useColorMode();

  // gradient
  const top =
    colorMode == "light" ? `rgba(245,245,245, 0.7)` : `rgba(66,66,66,0.6)`;
  const bottom =
    colorMode == "light" ? `rgba(66,66,66,0.6)` : `rgba(0,0,0,0.6)`;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      toast.success("Đã gửi thông tin thành công");
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    },
    onSettled: () => {
      handleClose();
    },
  });

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    mutate({ ...data, userID: profile?.id, email, phone: Number(data?.phone) });
  }

  function handleOpen() {
    if (!email || !validator.isEmail(email)) {
      return toast.error("Vui lòng nhập email");
    }
    onOpen();
  }

  function handleClose() {
    setEmail("");
    reset();
    onClose();
  }

  useEffect(() => {
    document.title = "LandHub - Website số 1 về mua bán, cho thuê bất động sản";
  }, []);

  return (
    <Box py={5}>
      <VideoBackgroundWithSearch />
      <Box mx="auto" maxW="1500px">
        {/* stats */}
        <Center>
          <StatsCard />
        </Center>
        <Center>
          <Container maxW={"5xl"} pb={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack spacing={4}>
                <Text
                  textTransform={"uppercase"}
                  color={"blue.400"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={useColorModeValue("blue.50", "blue.900")}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  Tiêu chí
                </Text>
                <Heading fontSize={30}>
                  Đặt quyền lợi của người dùng lên hàng đầu
                </Heading>
                <Text color={"gray.500"} fontSize={"lg"}>
                  LandHub được xây dựng dựa theo 3 tiêu chí lớn
                </Text>
                <Stack
                  spacing={4}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.100", "gray.700")}
                    />
                  }
                  as={motion.div}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  variants={containerStoryVar}
                >
                  <StoryText
                    bg={useColorModeValue("yellow.100", "yellow.900")}
                    color="yellow.500"
                    label="Giao diện thân thiện với người dùng"
                    icon={FaChalkboardUser}
                  />
                  <StoryText
                    bg={useColorModeValue("green.100", "green.900")}
                    color="green.500"
                    icon={AiOutlineSafety}
                    label="Môi trường an toàn, bảo mật"
                  />

                  <StoryText
                    label="Cung cấp nhiều tiện ích"
                    bg={useColorModeValue("purple.100", "purple.900")}
                    color="purple.500"
                    icon={TbTool}
                  />
                </Stack>
              </Stack>
              <Flex
                as={motion.div}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
              >
                <Image
                  ml={5}
                  as={motion.img}
                  rounded={"md"}
                  variants={variants}
                  alt={"feature image"}
                  src={
                    "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  }
                  objectFit={"cover"}
                />
              </Flex>
            </SimpleGrid>
          </Container>
        </Center>
        {/* tes */}
        <Testimonials />
        {/* app features */}
        <Features />
        {/* CTA */}
        <Center
          mt={5}
          bgGradient={`linear-gradient(to bottom, ${top} 0%,${bottom} 100%), url('/cta.jpg');`}
          // bg="url('/cta.jpg')"
          bgRepeat="no-repeat"
          maxW="1200px"
          mx="auto"
          rounded="lg"
          bgSize="cover"
          color="whiteAlpha.800"
        >
          <Box as="section" opacity={1} width="full" backdropFilter="blur(3px)">
            <Flex align={"center"} justify={"center"} py={3} bg="transparent">
              <Stack
                boxShadow={"sm"}
                rounded={"xl"}
                p={10}
                spacing={8}
                align={"center"}
              >
                <Icon as={NotificationIcon} w={24} h={24} />
                <Stack align={"center"} spacing={2}>
                  <Heading
                    textTransform={"uppercase"}
                    fontSize={"2xl"}
                    color="white"
                  >
                    Liên hệ
                  </Heading>
                  <Text
                    fontSize={"lg"}
                    textAlign="center"
                    color={useColorModeValue("whiteAlpha.900", "white")}
                  >
                    Vui lòng gửi những góp ý của bạn dưới đây, cảm ơn!
                  </Text>
                </Stack>
                <Stack
                  spacing={3}
                  direction={{ base: "column", md: "row" }}
                  w={"full"}
                >
                  <Input
                    type="email"
                    placeholder={"Email của bạn"}
                    _placeholder={{ color: "whiteAlpha.600" }}
                    rounded={"full"}
                    borderWidth={1.5}
                    color={"white"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    fontSize="xs"
                    rounded={"full"}
                    colorScheme="green"
                    flex={"1 0 auto"}
                    rightIcon={<FaRegPaperPlane />}
                    onClick={handleOpen}
                  >
                    Gửi góp ý
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay zIndex={10000} />
                    <ModalContent className="modal-media" mx={2}>
                      <ModalHeader>Thông tin liên hệ</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} id="contact">
                          <VStack gap={2} w="full">
                            <Flex
                              flexDirection={{ base: "column", md: "row" }}
                              w="full"
                              gap={{ base: 0, md: 2.5 }}
                            >
                              <FormControl isRequired>
                                <FormLabel>Họ và tên</FormLabel>
                                <Input
                                  {...register("name", {
                                    required: "Vui lòng nhập tên đầy đủ",
                                  })}
                                />
                                {errors.name && (
                                  <FormErrorMessage>
                                    {errors.name.message}
                                  </FormErrorMessage>
                                )}
                              </FormControl>
                              <FormControl>
                                <FormLabel>Số điện thoại</FormLabel>
                                <Input {...register("phone")} />
                                {errors.phone && (
                                  <FormErrorMessage>
                                    {errors.phone.message}
                                  </FormErrorMessage>
                                )}
                              </FormControl>
                            </Flex>
                            <FormControl isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input isDisabled value={email} />
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel>Tiêu đề</FormLabel>
                              <Input
                                {...register("title", {
                                  required: "Cần nhập tiêu đề bài viết góp ý",
                                  maxLength: {
                                    value: 200,
                                    message: "Giới hạn 200 ký tự cho phép",
                                  },
                                })}
                              />
                              {errors.title && (
                                <FormErrorMessage>
                                  {errors.title.message}
                                </FormErrorMessage>
                              )}
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel>Nội dung</FormLabel>
                              <Textarea
                                {...register("content", {
                                  required: "Cần nhập nội dung góp ý",
                                  maxLength: {
                                    value: 300,
                                    message: "Giới hạn 300 ký tự cho phép",
                                  },
                                })}
                              />
                              {errors.content && (
                                <FormErrorMessage>
                                  {errors.content.message}
                                </FormErrorMessage>
                              )}
                            </FormControl>
                          </VStack>
                        </form>
                      </ModalBody>

                      <ModalFooter justifyContent="space-between" w="full">
                        <Button
                          colorScheme="red"
                          size="sm"
                          mr={3}
                          onClick={handleClose}
                        >
                          Đóng
                        </Button>
                        <Button
                          isDisabled={isLoading}
                          form="contact"
                          type="submit"
                          variant="outline"
                          size="sm"
                          isLoading={isPending}
                          loadingText="Đang gửi"
                          colorScheme="green"
                        >
                          Gửi
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Stack>
              </Stack>
            </Flex>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default Home;

const NotificationIcon = createIcon({
  displayName: "Notification",
  viewBox: "0 0 128 128",
  path: (
    <g id="Notification">
      <rect
        className="cls-1"
        x="1"
        y="45"
        fill={"#fbcc88"}
        width="108"
        height="82"
      />
      <circle className="cls-2" fill={"#8cdd79"} cx="105" cy="86" r="22" />
      <rect
        className="cls-3"
        fill={"#f6b756"}
        x="1"
        y="122"
        width="108"
        height="5"
      />
      <path
        className="cls-4"
        fill={"#7ece67"}
        d="M105,108A22,22,0,0,1,83.09,84a22,22,0,0,0,43.82,0A22,22,0,0,1,105,108Z"
      />
      <path
        fill={"#f6b756"}
        className="cls-3"
        d="M109,107.63v4A22,22,0,0,1,83.09,88,22,22,0,0,0,109,107.63Z"
      />
      <path
        className="cls-5"
        fill={"#d6ac90"}
        d="M93,30l16,15L65.91,84.9a16,16,0,0,1-21.82,0L1,45,17,30Z"
      />
      <path
        className="cls-6"
        fill={"#cba07a"}
        d="M109,45,65.91,84.9a16,16,0,0,1-21.82,0L1,45l2.68-2.52c43.4,40.19,41.54,39.08,45.46,40.6A16,16,0,0,0,65.91,79.9l40.41-37.42Z"
      />
      <path
        className="cls-7"
        fill={"#dde1e8"}
        d="M93,1V59.82L65.91,84.9a16,16,0,0,1-16.77,3.18C45.42,86.64,47,87.6,17,59.82V1Z"
      />
      <path
        className="cls-8"
        fill={"#c7cdd8"}
        d="M74,56c-3.56-5.94-3-10.65-3-17.55a16.43,16.43,0,0,0-12.34-16,5,5,0,1,0-7.32,0A16,16,0,0,0,39,38c0,7.13.59,12-3,18a3,3,0,0,0,0,6H50.41a5,5,0,1,0,9.18,0H74a3,3,0,0,0,0-6ZM53.2,21.37a3,3,0,1,1,3.6,0,1,1,0,0,0-.42.7,11.48,11.48,0,0,0-2.77,0A1,1,0,0,0,53.2,21.37Z"
      />
      <path
        className="cls-3"
        fill={"#f6b756"}
        d="M46.09,86.73,3,127H1v-1c6-5.62-1.26,1.17,43.7-40.78A1,1,0,0,1,46.09,86.73Z"
      />
      <path
        className="cls-3"
        fill={"#f6b756"}
        d="M109,126v1h-2L63.91,86.73a1,1,0,0,1,1.39-1.49C111,127.85,103.11,120.51,109,126Z"
      />
      <path
        className="cls-8"
        fill={"#c7cdd8"}
        d="M93,54.81v5L65.91,84.9a16,16,0,0,1-16.77,3.18C45.42,86.64,47,87.6,17,59.82v-5L44.09,79.9a16,16,0,0,0,21.82,0Z"
      />
      <path
        className="cls-9"
        fill={"#fff"}
        d="M101,95c-.59,0-.08.34-8.72-8.3a1,1,0,0,1,1.44-1.44L101,92.56l15.28-15.28a1,1,0,0,1,1.44,1.44C100.21,96.23,101.6,95,101,95Z"
      />
      <path
        className="cls-3"
        fill={"#f6b756"}
        d="M56.8,18.38a3,3,0,1,0-3.6,0A1,1,0,0,1,52,20,5,5,0,1,1,58,20,1,1,0,0,1,56.8,18.38Z"
      />
      <path
        className="cls-1"
        fill={"#fbcc88"}
        d="M71,42.17V35.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,39,35c0,7.33.58,12-3,18H74A21.06,21.06,0,0,1,71,42.17Z"
      />
      <path
        className="cls-3"
        fill={"#f6b756"}
        d="M74,53H36a21.36,21.36,0,0,0,1.86-4H72.14A21.36,21.36,0,0,0,74,53Z"
      />
      <path className="cls-3" fill={"#f6b756"} d="M59.59,59a5,5,0,1,1-9.18,0" />
      <path
        className="cls-1"
        fill={"#fbcc88"}
        d="M74,59H36a3,3,0,0,1,0-6H74a3,3,0,0,1,0,6Z"
      />
    </g>
  ),
});

function StoryText({ bg, label, icon, color }) {
  return (
    <Stack
      as={motion.div}
      direction={"row"}
      align={"center"}
      variants={storyVar}
    >
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={bg}
      >
        <Icon as={icon} color={color} w={5} h={5} />
      </Flex>
      <Text fontWeight={600}>{label}</Text>
    </Stack>
  );
}
