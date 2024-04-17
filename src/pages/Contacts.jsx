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
import { createContact, getUsersList } from "../services/apiGeneral";
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
import { useState } from "react";
import { navLinks } from "../constants/navlink";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

function Contacts() {
  const bg = useColorModeValue("white", "darker");
  const color = useColorModeValue("darker", "white");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: profile, isLoading } = useAuth();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [email, setEmail] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      toast.success("da gui thong tin, cam on ?");
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("xay ra loi");
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

  const { data: { data: users, count } = {}, isLoading: isQuerying } = useQuery(
    {
      queryKey: ["users"],
      queryFn: () => getUsersList(page),
    },
  );
  console.log(users);

  return (
    <Box maxW="1500px" mx="auto" px={3}>
      {isLoading || isQuerying ? (
        <Center minH="50dvh">
          <Spinner />
        </Center>
      ) : (
        <>
          <BreadCrumb base="Danh bạ" />
          <Flex
            gap={2}
            justify="center"
            flexDirection={{ base: "column", md: "row" }}
            mt={3}
          >
            <VStack
              bg={bg}
              w="full"
              align="start"
              maxW={600}
              minH={400}
              justify="start"
              rounded="md"
            >
              <Box w={400} mx="auto" align="start" pt={4}>
                <Heading fontSize="large">Danh bạ nhà môi giới</Heading>
              </Box>
              <VStack w={400} mx="auto" align="start">
                {users.map((item) => (
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
                        <Text fontSize="xs" fontStyle="italic" color="gray.500">
                          {hiddenLast3PhoneNum(item.phone)}
                        </Text>
                      </Box>
                    </Flex>
                    <ButtonGroup flexDirection="column" gap={2}>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                        color
                        fontSize="xs"
                        fontWeight={500}
                        rightIcon={<BiSolidUserDetail />}
                      >
                        <Link
                          to={`/danh-ba/nguoi-dung/${slugify(
                            unidecode(item.fullName),
                          )}?u=${item.id}`}
                        >
                          Xem thêm
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                        color
                        fontSize="xs"
                        fontWeight={500}
                        rightIcon={<MdOutlineMarkEmailUnread />}
                      >
                        <Link to={`mailto:${item.email}`}>Gửi email</Link>
                      </Button>
                    </ButtonGroup>
                  </Box>
                ))}
              </VStack>
              <div className="flex self-center">
                <ChakraTablePagination count={count} />
              </div>
            </VStack>
            {/* sider */}
            <Box bg={bg} minH={300} w={300} rounded="md">
              <Box as="section" width="full">
                <Flex
                  align={"center"}
                  justify={"center"}
                  py={3}
                  bg="transparent"
                >
                  <Stack
                    rounded={"xl"}
                    p={8}
                    pb={3}
                    spacing={8}
                    align={"center"}
                  >
                    <Stack
                      spacing={4}
                      direction={{ base: "column" }}
                      w={"full"}
                    >
                      <Heading
                        fontSize="xx-large"
                        fontWeight={600}
                        textAlign="center"
                      >
                        Liên hệ
                      </Heading>
                      <Input
                        fontSize="sm"
                        type="email"
                        placeholder={"Email của bạn"}
                        _placeholder={{ color: "whiteAlpha.600" }}
                        rounded={"full"}
                        color={color}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button
                        size="sm"
                        rounded={"full"}
                        colorScheme="green"
                        flex={"1 0 auto"}
                        maxW={150}
                        fontSize="xs"
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
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              id="contact"
                            >
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
                                        required: "vui long nhap ten",
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
                                      required: "nhap tieu de",
                                      maxLength: {
                                        value: 200,
                                        message: "gioi han",
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
                                      required: "nhan nhu dieu gi?",
                                      maxLength: {
                                        value: 300,
                                        message: "gioi han",
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
                              Send
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Stack>
                  </Stack>
                </Flex>
              </Box>

              <Box>
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
                          className="text-sm py-1 transition-colors duration-300 last:pb-3 hover:text-primary dark:hover:text-secondary"
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
      )}
    </Box>
  );
}

export default Contacts;
