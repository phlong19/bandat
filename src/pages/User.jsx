import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUser, getUserPosts } from "../services/apiGeneral";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avatar from "../ui/Avatar";
import BreadCrumb from "../ui/BreadCrumb";
import GoBackButton from "../ui/GoBackButton";
import List from "../features/list/List";
import { FaRegPaperPlane } from "react-icons/fa6";
import { TbPhoneOutgoing, TbShare } from "react-icons/tb";
import { success } from "../constants/message";
import {
  convertSex,
  convertSexToText,
  formatDate,
  getAge,
} from "../utils/helper";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale/vi";

function User() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "dark");
  const gray = useColorModeValue("gray.700", "gray.400");
  const accent = useColorModeValue("primary", "secondary");

  const page = Number(searchParams.get("page")) || 1;
  const id = searchParams.get("u");

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: Boolean(id),
  });

  const {
    data: { posts, count } = {},
    isLoading: isQuerying,
    error,
  } = useQuery({
    queryKey: ["user-posts", id, page],
    queryFn: () => getUserPosts(data?.id, page),
    enabled: Boolean(data?.id),
  });

  // PRE-FETCHING
  const queryClient = useQueryClient();
  // next page
  queryClient.prefetchQuery({
    queryKey: ["user-posts", id, page + 1],
    queryFn: () => getUserPosts(data?.id, page + 1),
  });
  // prev page
  queryClient.prefetchQuery({
    queryKey: ["user-posts", id, page - 1],
    queryFn: () => getUserPosts(data?.id, page - 1),
  });

  useEffect(() => {
    if (!id) {
      toast.error("Không tìm thấy người dùng");
      return navigate("/danh-ba");
    }
    if (error && page > 1) {
      searchParams.set("page", 1);
      return setSearchParams(searchParams);
    }
  }, [id, navigate, error, page, searchParams, setSearchParams]);

  useEffect(() => {
    if (data?.fullName)
      document.title = `LandHub - ${data.fullName} | Cá nhân môi giới bất động sản`;
  }, [data?.fullName]);

  async function handleClick(e) {
    e.stopPropagation();
    const link = window.location.href;
    await navigator.clipboard.writeText(link);
    return toast.success(success.copyToClipboard);
  }

  return (
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
      <BreadCrumb base="Danh bạ" />

      <div className="mt-5">
        <Flex my={2} mx={3} justify="space-between">
          <GoBackButton />
          <Box>
            <Button
              size="xs"
              fontWeight={400}
              colorScheme="green"
              leftIcon={<TbShare />}
              onClick={(e) => handleClick(e)}
            >
              Chia sẻ hồ sơ
            </Button>
          </Box>
        </Flex>

        {isLoading ? (
          <Center minH="60dvh">
            <Spinner />
          </Center>
        ) : (
          <Box p={4}>
            <Flex w="full" gap="3" direction={{ base: "column", md: "row" }}>
              <Center minW={{ sm: 300, md: 320 }} maxW={{ md: 400 }}>
                <Box
                  w={"full"}
                  bg={bg}
                  boxShadow={{ base: "md", md: "xl" }}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Box
                    pos="relative"
                    boxShadow="2xl"
                    rounded="full"
                    w="fit-content"
                    mx="auto"
                    mb={4}
                  >
                    <Avatar
                      csz
                      avatar={data.avatar}
                      fullName={data.fullName}
                      badge={false}
                    />
                  </Box>
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {data.fullName}
                  </Heading>
                  <Text fontSize="sm" pt={1.5} color={"gray.500"} mb={4}>
                    {data.email}
                  </Text>
                  <Text textAlign={"center"} color={gray} px={3}>
                    {data.bio}
                  </Text>

                  <Stack
                    align="center"
                    justify="center"
                    gap={3}
                    mt={8}
                    direction={"row"}
                    spacing={4}
                  >
                    <Link to={`mailto:${data.email}`}>
                      <Button
                        flex={1}
                        fontSize={"xs"}
                        rounded={"full"}
                        _focus={{
                          bg: "gray.200",
                        }}
                        leftIcon={<FaRegPaperPlane fontSize="14" />}
                      >
                        Gửi Email
                      </Button>
                    </Link>
                    {data.phone && (
                      <Link to={`tel:0${data.phone}`}>
                        <Button
                          leftIcon={<TbPhoneOutgoing fontSize="15" />}
                          flex={1}
                          fontSize={"xs"}
                          rounded={"full"}
                          bg={accent}
                          color="light"
                          boxShadow={
                            "0px 1px 25px -5px rgb(82, 170, 94, 48%), 0 10px 10px -5px rgb(121,180,115, 48%)"
                          }
                          _hover={{
                            bg: "green.400",
                          }}
                          _focus={{
                            bg: "green.300",
                          }}
                        >
                          0{data.phone}
                        </Button>
                      </Link>
                    )}
                  </Stack>
                </Box>
              </Center>
              {/* in4 */}
              <Box
                w="full"
                overflowX="auto"
                rounded="md"
                bg={bg}
                boxShadow="md"
              >
                <Box p={3} h="full">
                  <Heading size="md" color={accent} pb={2}>
                    Thông tin người dùng
                  </Heading>
                  <SimpleGrid columns={2} rowGap={3} pb={2}>
                    <InformationItem
                      label="Giới tính"
                      value={convertSexToText(convertSex(data.sex))}
                    />
                    {data?.birthday && (
                      <InformationItem
                        label="Ngày sinh"
                        value={formatDate(data?.birthday)}
                      />
                    )}
                    <InformationItem
                      label="Tuổi người dùng"
                      value={getAge(data.birthday)}
                    />
                    <InformationItem
                      label="Tuổi tài khoản"
                      value={formatDistanceToNow(data.created_at, {
                        locale: vi,
                        addSuffix: true,
                      })}
                    />

                    <InformationItem label="Địa chỉ" value={data.address} />
                    <InformationItem
                      label="Phường, xã"
                      value={data?.ward?.wardName}
                    />
                  </SimpleGrid>

                  <SimpleGrid columns={2} pt={2} rowGap={2}>
                    <InformationItem
                      label="Quận, huyện"
                      value={data?.dis?.disName}
                    />
                    <InformationItem
                      label="Tỉnh, thành phố"
                      value={data?.city?.cityName}
                    />
                  </SimpleGrid>
                </Box>
              </Box>
            </Flex>
            <Box pt={5} maxH={{ base: "auto", xl: count < 5 ? 760 : "850" }}>
              <Heading color={accent} size="md" pl={3}>
                Danh sách bài đăng
              </Heading>
              <List
                data={posts}
                isLoading={isQuerying}
                count={count}
                userpage
              />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}

export default User;

function InformationItem({ label, value }) {
  return (
    <Flex direction="column">
      <Text color="gray">{label}</Text>
      <Text>{value ? value : "--"}</Text>
    </Flex>
  );
}
