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
import { ListProps } from "../model";
import { Helmet } from "react-helmet-async";

function UserDashboard({ form = false }) {
  const activePage = window.location.pathname.includes("quan-ly")
    ? "Quản lý sản phẩm"
    : "Thêm sản phẩm";

  const { title } = useParams();
  const navigate = useNavigate();
  const { data, level, isLoading } = useAuth();
  let { product, isFetching } = useGetRE(title || "", level);

  useEffect(() => {
    if (title && !product && !isFetching) {
      toast.error("Không tìm thấy sản phẩm");
      navigate("/quan-ly-san-pham");
    } else if (product) {
      document.title = "Chi tiết thông tin sản phẩm " + product.name;
    }
  }, [product, navigate, isFetching, title, activePage]);

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
      <Helmet>
        <title>{activePage}</title>
      </Helmet>
      <ChakraBreadcrumb page={activePage} />
      {!form ? (
        <UserDashboardTable id={data.id} level={level} />
      ) : (
        <Box maxWidth="85%" minWidth="85%" mx="auto">
          <REForm
            level={level}
            userID={data.id}
            edit={Boolean(product)}
            editData={product as ListProps["data"]}
            key={product?.id || "new"}
          />
        </Box>
      )}
    </Box>
  );
}

export default UserDashboard;
