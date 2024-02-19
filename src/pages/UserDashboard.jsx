import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Box, Center, Spinner } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import REForm from "../features/form/REForm";

import { useAuth } from "../context/UserContext";
import UserDashboardTable from "../features/dashboard/UserDashboardTable";
import { useGetRE } from "../features/form/useGetRE";
import { useEffect } from "react";

function UserDashboard({ form = false }) {
  const page = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";

  const navigate = useNavigate();
  const { title } = useParams();
  const { data, level, isLoading } = useAuth();
  const { post, isFetching } = useGetRE(title);

  console.log(title);
  // future: get re dir data base on level
  // admin: all posts
  // user: only posts from that user

  useEffect(() => {
    if (title && !post && !isFetching) {
      toast.error("khong tim thay bai viet");
      navigate("/dang-tin");
    }
  }, [post, navigate, isFetching, title]);

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
        <Box maxWidth="90%" minWidth="85%" mx="auto">
          <REForm id={data.id} edit={Boolean(post)} editData={post} />
        </Box>
      )}
    </Box>
  );
}

export default UserDashboard;
