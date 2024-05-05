import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Box, Center, Spinner } from "@chakra-ui/react";

import ChakraBreadcrumb from "../ui/ChakraBreadcrumb";
import REForm from "../features/form/REForm";
import UserDashboardTable from "../features/dashboard/UserDashboardTable";

import { useGetRE } from "../features/form/useGetRE";
import { useAuth } from "../context/UserContext";
import SkeletonREForm from "../ui/SkeletonREForm";
import { EDITOR_LEVEL } from "../constants/anyVariables";

function UserDashboard({ form = false }) {
  const activePage = window.location.pathname.includes("dang-tin")
    ? "Đăng tin"
    : "Quản lý bài viết";

  const { title } = useParams();
  const navigate = useNavigate();
  const { data, level, isLoading } = useAuth();
  let { post, isFetching } = useGetRE(title, level, data.id);

  // change page title
  useEffect(() => {
    document.title = activePage;
  }, [activePage]);

  useEffect(() => {
    if (title && !post && !isFetching) {
      toast.error("khong tim thay bai viet");
      navigate("/dang-tin");
    } else if (post) {
      document.title = "Chi tiết bài viết " + post.name;
    }
  }, [post, navigate, isFetching, title, activePage]);

  useEffect(() => {
    if (level == EDITOR_LEVEL) {
      return navigate("/quan-ly-tin-tuc");
    }
  }, [level, navigate]);

  if (isLoading) {
    return (
      <Center minH="100%">
        <Spinner speed="0.4s" />
      </Center>
    );
  }

  // isFetching => loading existed post (edit)
  if (isFetching) {
    return <SkeletonREForm activePage={activePage} />;
  }

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <ChakraBreadcrumb page={activePage} />
      {!form ? (
        <UserDashboardTable id={data.id} level={level} />
      ) : (
        <Box maxWidth="85%" minWidth="85%" mx="auto">
          <REForm
            currentUserLevel={level}
            userID={data.id}
            edit={Boolean(post)}
            editData={post}
            key={post?.id || "new"}
          />
        </Box>
      )}
    </Box>
  );
}

export default UserDashboard;
