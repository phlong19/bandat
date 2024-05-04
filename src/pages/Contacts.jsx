import {
  Avatar,
  Box,
  Center,
  Flex,
  VStack,
  Spinner,
  Text,
  useColorModeValue,
  FormErrorMessage,
  ModalFooter,
  Button,
  FormLabel,
  FormControl,
  Textarea,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Stack,
  Heading,
  useDisclosure,
  ModalHeader,
  UnorderedList,
  ListItem,
  ButtonGroup,
} from "@chakra-ui/react";
import BreadCrumb from "../ui/BreadCrumb";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContact,
  getUsersList,
  queryUsers,
} from "../services/apiGeneral";
import { Link, useSearchParams } from "react-router-dom";
import ChakraTablePagination from "../ui/ChakraTablePagination";
import { hiddenLast3PhoneNum } from "../utils/helper";
import slugify from "react-slugify";
import unidecode from "unidecode";
import { FaRegPaperPlane } from "react-icons/fa6";
import validator from "validator";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UserContext";
import { useEffect, useState } from "react";
import { navLinks } from "../constants/navlink";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

function Contacts() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const bg = useColorModeValue("white", "darker");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: profile, isLoading } = useAuth();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [email, setEmail] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      toast.success("Cảm ơn bạn đã gửi thông tin");
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Xảy ra lỗi trong quá trình gửi");
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
      return toast.error("vui long nhap email");
    }
    onOpen();
  }

  function handleClose() {
    setEmail("");
    reset();
    onClose();
  }

  const {
    data: { data: users, count: normalCount } = {},
    isLoading: isQuerying,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsersList(page),
    enabled: search.length == 0,
  });

  // search logic
  const { data: { data, count: queryCount } = {}, isLoading: isSearching } =
    useQuery({
      queryKey: ["users-search", page, debouncedSearch],
      queryFn: () => queryUsers(debouncedSearch, page),
      enabled: debouncedSearch.length >= 3,
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3) {
        setDebouncedSearch(search.toString());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    document.title = "Danh bạ môi giới nhà đất - Các cá nhân môi giới nhà đất";
  }, []);

  const list = search.length < 3 ? users : data;
  const count = search.length < 3 ? normalCount : queryCount;

  return (
    <Box maxW="1500px" mx="auto">
      <>
        <BreadCrumb base="Danh bạ" />
        <Flex
          gap={2}
          w="full"
          justify="center"
          flexDirection={{ base: "column", md: "row" }}
          bg={bg}
        >
          <VStack
            position="relative"
            bg={bg}
            w="full"
            align="start"
            maxW={{ base: "full", md: 700, xl: 1000 }}
            minH={400}
            rounded="md"
          >
            <Box
              mx="auto"
              px={2}
              align="start"
              pt={4}
              minW={{ base: "full", md: 500, lg: 700, xl: 800 }}
            >
              <Flex
                align="center"
                w="full"
                px={{ base: 2, lg: 0 }}
                direction={{ base: "column-reverse", md: "row" }}
                justify="space-between"
              >
                <Box my={{ base: 2, md: 0 }}>
                  <Heading
                    fontSize="large"
                    className={
                      (isLoading || isQuerying) && "absolute left-0 pl-2"
                    }
                  >
                    Danh bạ
                  </Heading>
                  {!isLoading && !isQuerying && !isSearching && (
                    <Text fontSize="xs" color="gray">
                      Có {count} tài khoản môi giới cá nhân
                    </Text>
                  )}
                </Box>
                <Box minW={{ base: "80%", md: "45%" }} mb={{ base: 1, md: 0 }}>
                  <Input
                    fontSize="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    placeholder="Tìm theo tên"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>
              </Flex>
              {isLoading || isQuerying || isSearching ? (
                <Center minH="50dvh">
                  <Spinner />
                </Center>
              ) : (
                <VStack
                  w={{ base: "auto", sm: 400, md: 500, lg: 600, xl: 800 }}
                  minH={800}
                  mx="auto"
                  align="start"
                >
                  {list.map((item) => (
                    <Box
                      key={item.id}
                      py={2}
                      w="full"
                      minH={100}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Flex gap={3} w="full" mx="auto" align="center">
                        <Avatar
                          boxShadow="xl"
                          size="lg"
                          src={item.avatar}
                          rounded="none"
                          borderRadius="none"
                          name={item.fullName}
                        />
                        <Box>
                          <Text
                            className="hover:text-primary dark:hover:text-secondary"
                            as={Link}
                            to={`/danh-ba/nguoi-dung/${slugify(
                              unidecode(item.fullName),
                            )}?u=${item.id}`}
                          >
                            {item.fullName}
                          </Text>
                          <Text
                            fontSize="xs"
                            fontStyle="italic"
                            color="gray.500"
                          >
                            {hiddenLast3PhoneNum(item.phone)}
                          </Text>
                        </Box>
                      </Flex>
                      <ButtonGroup
                        alignItems="start"
                        flexDirection={{ base: "column", lg: "row" }}
                        gap={2}
                      >
                        <Link
                          to={`/danh-ba/nguoi-dung/${slugify(
                            unidecode(item.fullName),
                          )}?u=${item.id}`}
                        >
                          <Button
                            size="sm"
                            variant={{ lg: "ghost", base: "outline" }}
                            colorScheme="green"
                            color
                            fontSize="xs"
                            fontWeight={500}
                            rightIcon={<BiSolidUserDetail />}
                          >
                            Xem thêm
                          </Button>
                        </Link>
                        <Link
                          to={`mailto:${item.email}`}
                          style={{ marginInlineStart: 0 }}
                        >
                          <Button
                            size="sm"
                            variant={{ lg: "ghost", base: "outline" }}
                            colorScheme="green"
                            color
                            fontSize="xs"
                            fontWeight={500}
                            rightIcon={<MdOutlineMarkEmailUnread />}
                          >
                            Gửi email
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
            <div className="flex self-center">
              <ChakraTablePagination news count={count} />
            </div>
          </VStack>

          {/* sider */}
          <Box
            borderWidth={1.3}
            m={2}
            mt={{ base: 2, lg: "16px" }}
            className="dark:bg-dark"
            minH={300}
            w={{ base: "auto", md: 300 }}
            rounded="md"
          >
            <Box
              roundedTop="lg"
              as="section"
              width="full"
              bgImage="/contact.png"
              bgSize="cover"
              bgRepeat="no-repeat"
            >
              <Flex
                backdropFilter="blur(2px)"
                align={"center"}
                justify={"center"}
                py={3}
                bg="transparent"
              >
                <Stack rounded={"xl"} p={8} pb={3} spacing={8} align={"center"}>
                  <Stack spacing={4} direction={{ base: "column" }} w={"full"}>
                    <Heading
                      fontSize="x-large"
                      fontWeight={600}
                      textAlign="center"
                      color="black"
                    >
                      Liên hệ
                    </Heading>
                    <Input
                      borderColor="black"
                      borderWidth={1.5}
                      size="sm"
                      fontSize="xs"
                      p={4}
                      _hover={{ borderColor: "primary" }}
                      type="email"
                      placeholder={"Email của bạn"}
                      _placeholder={{
                        color: "black",
                        fontSize: "xs",
                      }}
                      rounded={"full"}
                      color="black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      size="sm"
                      rounded={"full"}
                      colorScheme="green"
                      flex={"1 0 auto"}
                      maxW={150}
                      fontWeight={500}
                      fontSize="xs"
                      p={4}
                      mx="auto"
                      rightIcon={<FaRegPaperPlane />}
                      onClick={handleOpen}
                    >
                      Subscribe
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
                                      required: "Vui lòng cung cấp họ tên",
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
                                    required: "Vui lòng nhập tiêu đề",
                                    maxLength: {
                                      value: 200,
                                      message: "Vượt quá giới hạn ký tự",
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
                                    required:
                                      "Bạn nhắn nhủ điều gì đến BQT web?",
                                    maxLength: {
                                      value: 300,
                                      message: "Vượt quá giới hạn ký tự",
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

            <Box py={5}>
              {navLinks.map((i, index) => (
                <Box key={index} pl={8} pr={3}>
                  <Link
                    className="text-md font-bold text-primary hover:text-darker dark:text-secondary dark:hover:text-light"
                    to={`/${i.to}`}
                  >
                    {i.title}
                  </Link>
                  <UnorderedList className="contacts">
                    {i.child_links.map((e) => (
                      <ListItem
                        key={e.type}
                        className="py-1 text-sm transition-colors duration-300 last:pb-3 hover:text-primary dark:hover:text-secondary"
                      >
                        <Link to={`/${i.to}/${e.type}`}>{e.title}</Link>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>
      </>
    </Box>
  );
}

export default Contacts;
