import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Box } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import REForm from "../features/form/REForm";
import SpinnerFullPage from "../ui/SpinnerFullPage";

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
    return <SpinnerFullPage />;
  }

  // if (!post && title && !isFetching) {
  //   toast.error("khong tim thay bai viet");
  //   navigate("/dang-tin");
  // }
  console.log(post);

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
