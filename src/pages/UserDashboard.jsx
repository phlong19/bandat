import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Box, Center, Spinner } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import REForm from "../features/form/REForm";
import UserDashboardTable from "../features/dashboard/UserDashboardTable";

import { useGetRE } from "../features/form/useGetRE";
import { useAuth } from "../context/UserContext";

function UserDashboard({ form = false }) {
  const page = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";
  let check = page.includes("tin");

  const { title } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, level, isLoading } = useAuth();
  let { post, isFetching } = useGetRE(title);

  useEffect(() => {
    if (title && !post && !isFetching) {
      toast.error("khong tim thay bai viet");
      navigate("/dang-tin");
    }
  }, [post, navigate, isFetching, title]);

  if (check) {
    queryClient.removeQueries({ queryKey: ["singleRE"] });
  }

  if (isLoading || isFetching) {
    return (
      <Center minH="100%">
        <Spinner thickness="4px" emptyColor="gray.300" size="lg" speed="0.4s" />
      </Center>
    );
  }

  return (
    <Box h="100%" gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page={page} />
      {!form ? (
        <UserDashboardTable id={data.id} level={level} />
      ) : (
        <Box maxWidth="85%" minWidth="85%" mx="auto">
          <REForm
            id={data.id}
            edit={Boolean(post)}
            editData={post}
            check={check}
          />
        </Box>
      )}
    </Box>
  );
}

export default UserDashboard;
