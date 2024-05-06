import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import ChakraBreadcrumb from "../../ui/ChakraBreadcrumb";
import ChakraTable from "../table/ChakraTable";
import TableDocRow from "../table/TableDocRow";
import TableTypeRow from "../table/TableTypeRow";
import TableUserRow from "../table/TableUserRow";
import TableContactRow from "../table/TableContactRow";
import AdminChart from "../chart/AdminChart";

import { useGetFullTypeList } from "./useGetFullTypeList";
import { useGetFullListDocs } from "./useGetFullListDocs";
import { useGetFullUsers } from "./useGetFullUsers";
import {
  ADMIN_LEVEL,
  EDITOR_LEVEL,
  LIMIT_PER_PAGE,
  profileCaptions,
  USER_LEVEL,
} from "../../constants/anyVariables";
import { useGetContactLists } from "./useGetContactLists";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "../../services/apiManage";
import toast from "react-hot-toast";
import { getStatusBadgeProfile } from "../../utils/helper";
import { LiaSave } from "react-icons/lia";

function AdminDashboardTable({ sub }) {
  const [query, setQuery] = useState("");
  const { data, count, isFetching } = useGetFullListDocs(sub);
  const { types, typesCount, isLoading } = useGetFullTypeList(sub);
  const { contacts, contactCount, isFetchingContact } = useGetContactLists(sub);
  const { users, usersCount, isUsering } = useGetFullUsers(query);

  // role page
  const accent = useColorModeValue("primary", "secondary");
  const bg = useColorModeValue("light", "darker");
  const border = useColorModeValue("lightgrey", "gray");

  // state
  const [currentUser, setCurrentUser] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(1);

  // lib hooks
  const queryClient = useQueryClient();
  const { data: usersList, isLoading: isQuerying } = useQuery({
    queryFn: getUsers,
    queryKey: ["users-role"],
    enabled: Boolean(sub),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, level }) => updateUserRole(id, level),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users-role"] });
      toast.success(`Cập nhật quyền hạn tài khoản ${data.fullName} thành công`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (currentUser?.id) {
      setSelectedLevel(currentUser.level);
    }
  }, [currentUser]);

  function handleSave() {
    if (!currentUser?.id) {
      return toast.error("Vui lòng chọn người dùng");
    }
    mutate(
      { id: currentUser.id, level: selectedLevel },
      { onSettled: () => reset() },
    );
  }

  function reset() {
    document.getElementById("input").value = "";
    setCurrentUser({});
    setSelectedLevel(1);
  }

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Admin" />

      {/* chart */}
      <AdminChart />

      {sub ? (
        <Box
          border={isQuerying ? "none" : "1px solid gray"}
          p={3}
          borderRadius="md"
        >
          <Heading size="md" color={accent} py={4}>
            Phân quyền người dùng
          </Heading>
          {isQuerying ? (
            <Center minH="30dvh">
              <Spinner />
            </Center>
          ) : (
            <Stack direction="column" spacing={3}>
              <Flex align="center" gap={3}>
                <Text minW="fit-content" mb={1.5}>
                  Chọn người dùng
                </Text>
                <Box pos="relative" w="full" className="group">
                  <InputGroup>
                    <Input
                      maxW="40%"
                      id="input"
                      mb={1.5}
                      value={currentUser?.fullName}
                    />
                    <InputRightElement ml={2} position="relative">
                      <Tooltip label="Clear">
                        <Button
                          size="md"
                          fontSize="sm"
                          variant="ghost"
                          colorScheme="green"
                          color={"white"}
                          onClick={reset}
                        >
                          x
                        </Button>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>

                  <Container
                    className="invisible hover:visible group-hover:visible"
                    p={1}
                    zIndex={1000}
                    border="1px solid"
                    borderColor={border}
                    rounded="md"
                    position="absolute"
                    minW="40%"
                    w="40%"
                    bg={bg}
                    maxW="40%"
                    h={200}
                    overflowY="auto"
                  >
                    {usersList.slice(0, LIMIT_PER_PAGE).map((i) => (
                      <Container
                        key={i.id}
                        id={i.id}
                        p={1.5}
                        cursor="grab"
                        _hover={{ bg: "white", _dark: { bg: "dark" } }}
                        datavalue={i.id}
                        onClick={(e) =>
                          setCurrentUser(
                            usersList.find((i) => i.id === e.target.id),
                          )
                        }
                      >
                        {i.fullName} -{" "}
                        <Badge
                          colorScheme={getStatusBadgeProfile(i.level)}
                          fontSize="xs"
                          p="3px 10px"
                          borderRadius="lg"
                          textTransform="capitalize"
                        >
                          {i.level === USER_LEVEL
                            ? "User"
                            : i.level === ADMIN_LEVEL
                              ? "Admin"
                              : "Editor"}
                        </Badge>
                      </Container>
                    ))}
                    <Container
                      key={Math.random()}
                      p={1.5}
                      cursor="default"
                      color={accent}
                    >
                      ... Tìm kiếm để xem thêm
                    </Container>
                  </Container>
                </Box>
              </Flex>
              {currentUser?.id && (
                <Flex gap={3} pt={1} align="center">
                  <Text>Cập nhật thành:</Text>
                  <RadioGroup
                    onChange={(e) => setSelectedLevel(Number(e))}
                    value={selectedLevel}
                  >
                    <Stack direction="row">
                      <Radio
                        colorScheme={getStatusBadgeProfile(USER_LEVEL)}
                        value={USER_LEVEL}
                      >
                        User
                      </Radio>
                      <Radio
                        colorScheme={getStatusBadgeProfile(EDITOR_LEVEL)}
                        value={EDITOR_LEVEL}
                      >
                        Editor
                      </Radio>
                      <Radio
                        colorScheme={getStatusBadgeProfile(ADMIN_LEVEL)}
                        value={ADMIN_LEVEL}
                      >
                        Admin
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              )}
              <Button
                isLoading={isPending}
                isDisabled={!currentUser?.id}
                size="sm"
                fontSize="sm"
                w="fit-content"
                leftIcon={<LiaSave fontSize={16} />}
                ml="auto"
                colorScheme="green"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </Stack>
          )}
        </Box>
      ) : (
        <>
          <ChakraTable
            isLoading={isUsering}
            page="user-page"
            viewOnly
            captions={profileCaptions}
            count={usersCount}
            data={users}
            render={(item) => <TableUserRow data={item} key={item.id} />}
            title="Danh sách hồ sơ người dùng"
            setQuery={setQuery}
          />
          <ChakraTable
            isLoading={isFetchingContact}
            data={contacts}
            captions={[
              "Tên",
              "Số điện thoại",
              "Email",
              "Tiêu đề",
              "Nội dung",
              "Ngày gửi",
              "Người dùng",
            ]}
            count={contactCount}
            page="contact-page"
            render={(item) => <TableContactRow data={item} key={item.id} />}
            title="Danh sách tin liên hệ, góp ý"
            viewOnly
            profile={false}
          />
          <Flex gap={3} w="full" maxH="55dvh">
            <ChakraTable
              isLoading={isLoading}
              page="doc-page"
              viewOnly
              captions={["ID", "Tên", "Ngày tạo"]}
              count={count}
              data={data}
              render={(item) => <TableDocRow data={item} key={item.doc_id} />}
              title="Danh sách giấy tờ, tài liệu pháp lý"
              profile={false}
            />
            <ChakraTable
              viewOnly
              isLoading={isFetching}
              page="type-page"
              captions={["Type ID", "Tên loại hình", "Ngày tạo"]}
              count={typesCount}
              data={types}
              render={(item) => (
                <TableTypeRow data={item} key={item.REType_ID} />
              )}
              title="Danh sách loại hình bất động sản"
              profile={false}
            />
          </Flex>
        </>
      )}
    </Box>
  );
}

export default AdminDashboardTable;
