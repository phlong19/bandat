import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUser } from "../services/apiGeneral";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BreadCrumb from "../ui/BreadCrumb";
import GoBackButton from "../ui/GoBackButton";
import RelatedPosts from "../ui/RelatedPosts";

function User() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "dark");
  const gray = useColorModeValue("gray.700", "gray.400");
  const accent = useColorModeValue("primary", "secondary");

  const page = Number(searchParams.get("page")) || 1;
  const id = searchParams.get("u");

  const { data, isLoading } = useQuery({
    queryKey: ["user", id, page],
    queryFn: () => getUser(id, page),
  });

  useEffect(() => {
    if (!id) {
      toast.error("Không tìm thấy người dùng");
      return navigate("/danh-ba");
    }
  }, [id, navigate]);

  console.log(data);

  return (
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
      <BreadCrumb base="Danh bạ" />

      <div className="mt-5">
        <Flex my={2} ml={2}>
          <GoBackButton />
        </Flex>

        {isLoading ? (
          <Center minH="60dvh">
            <Spinner />
          </Center>
        ) : (
          <Box p={4}>
            <Flex w="full" gap="3">
              <Center>
                <Box
                  maxW={{ base: "400px", lg: 600 }}
                  w={"full"}
                  bg={bg}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Avatar
                    size={"xl"}
                    src={data.avatar}
                    name={data.fullName}
                    mb={4}
                    pos={"relative"}
                    _after={{
                      content: '""',
                      w: 4,
                      h: 4,
                      bg: "green.300",
                      border: "2px solid white",
                      rounded: "full",
                      pos: "absolute",
                      bottom: 0,
                      right: 3,
                    }}
                  />
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {data.fullName}
                  </Heading>
                  <Text fontSize="sm" pt={1.5} color={"gray.500"} mb={4}>
                    {data.email}
                  </Text>
                  <Text textAlign={"center"} color={gray} px={3}>
                    Actress, musician, songwriter and artist. PM for work
                    inquires or <Text color={"blue.400"}>#tag</Text> me in your
                    posts
                  </Text>

                  <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
                  >
                    <Badge px={2} py={1} bg="gray" fontWeight={"400"}>
                      #art
                    </Badge>
                    <Badge px={2} py={1} bg="gray" fontWeight={"400"}>
                      #photography
                    </Badge>
                    <Badge px={2} py={1} bg="gray" fontWeight={"400"}>
                      #music
                    </Badge>
                  </Stack>

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
                      >
                        Gửi Email
                      </Button>
                    </Link>
                    <Link to={`tel:0${data.phone}`}>
                      <Button
                        flex={1}
                        fontSize={"xs"}
                        rounded={"full"}
                        bg={accent}
                        color="white"
                        boxShadow={
                          "0px 1px 25px -5px rgb(82, 170, 94), 0 10px 10px -5px rgb(121,180,115)"
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
                  </Stack>
                </Box>
              </Center>
              {/* infor */}
              <Box
                w="full"
                overflowX="auto"
                rounded="md"
                bg={bg}
                boxShadow="md"
              >
                <Box pt={5}>
                  <Heading color={accent} size="md">
                    Bài đăng của tác giả
                  </Heading>
                  <RelatedPosts
                    author={false}
                    data={data.list}
                    isLoading={isLoading}
                  />
                </Box>
              </Box>
            </Flex>
            {/* <Box pt={5}>
              <Heading color={accent} size="md">
                Bài đăng của tác giả
              </Heading>
              <RelatedPosts author={false} data={data.list} isLoading={isLoading} />
            </Box> */}
          </Box>
        )}
      </div>
    </div>
  );
}

export default User;
