import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import ListItem from "../features/list/ListItem";

function User() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.900");
  const gray = useColorModeValue("gray.700", "gray.400");
  const accent = useColorModeValue("primary", "secondary");
  const color = useColorModeValue("#404040", "white");

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
          <Flex w="full" p={4} gap="3">
            <Center>
              <Box
                maxW={"320px"}
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
                <Text fontWeight={600} color={"gray.500"} mb={4}>
                  {data.email}
                </Text>
                <Text textAlign={"center"} color={gray} px={3}>
                  Actress, musician, songwriter and artist. PM for work inquires
                  or <Text color={"blue.400"}>#tag</Text> me in your posts
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

                <Stack mt={8} direction={"row"} spacing={4}>
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    rounded={"full"}
                    _focus={{
                      bg: "gray.200",
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={accent}
                    color={color}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                      bg: "green.500",
                    }}
                    _focus={{
                      bg: "green.500",
                    }}
                  >
                    Follow
                  </Button>
                </Stack>
              </Box>
            </Center>
            <Box className={`${data.list.length < 5 && 'max-h-[300px]'} max-h-[fit-content] mx-auto mt-3 min-h-[30dvh] max-w-[1500px] space-y-4 overflow-auto lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0 xl:grid-cols-4 xl:gap-4`}>
              {data.list.map((post) => (
                <ListItem
                  key={post.id}
                  data={post}
                  purType={post.purType}
                  author={false}
                />
              ))}
            </Box>
          </Flex>
        )}
      </div>
    </div>
  );
}

export default User;
