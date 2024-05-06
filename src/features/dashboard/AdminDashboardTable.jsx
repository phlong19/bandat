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
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Text,
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
  profileCaptions,
  USER_LEVEL,
} from "../../constants/anyVariables";
import { useGetContactLists } from "./useGetContactLists";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "../../services/apiManage";
import toast from "react-hot-toast";
import { success } from "../../constants/message";
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

  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();
  const { data: usersList, isLoading: isQuerying } = useQuery({
    queryFn: getUsers,
    queryKey: ["users-role"],
    enabled: Boolean(sub),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id, level) => updateUserRole(id, level),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-role"] });
      toast.success(success.updateOthers);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page="Admin" />

      {/* chart */}
      <AdminChart />

      {sub ? (
        <Box border="1px solid gray" p={3} borderRadius="md">
          <Heading size="md" color={accent} py={4}>
            Phân quyền người dùng
          </Heading>
          {isQuerying ? (
            <Center minH="30dvh">
              <Spinner />
            </Center>
          ) : (
            <Stack direction="column" spacing={3}>
              <Flex align="center" gap={3} position="relative">
                <Text>Chọn người dùng</Text>
                <Input
                  maxW="50%"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                />
                {!show && (
                  <Container
                    top="120%"
                    left="16%"
                    rounded="md"
                    position="absolute"
                    minW={370}
                    w={370}
                    maxW={370}
                    bg="red"
                    h={200}
                    overflowY="auto"
                  >
                    TODO
                  </Container>
                )}
              </Flex>
              {/* <Flex gap={3} align="center">
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
              </Flex> */}
              <Button
                size="sm"
                fontSize="sm"
                w="fit-content"
                leftIcon={<LiaSave fontSize={16} />}
                ml="auto"
                colorScheme="green"
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
