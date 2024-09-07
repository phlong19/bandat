import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import List from "../features/list/List";

import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LuSearchX } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { queryList } from "../services/apiSearch";

function ListingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const search = state?.query;

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "created_at-desc";

  const {
    data: { data: queryData, count: queryCount } = {},
    isLoading: isQuerying,
  } = useQuery({
    queryKey: ["query-results", search, sort, page],
    queryFn: () => queryList(search, sort, page),
  });

  useEffect(() => {
    if (location.href.includes("tim-kiem") && !search) {
      toast.error("Không tìm thấy từ khóa tìm kiếm", {
        icon: (
          <span className="text-2xl text-yellow-500">
            <LuSearchX />
          </span>
        ),
      });
      navigate("/");
    }
  }, [search]);

  return (
    <>
      <Helmet>
        <title>Danh sách tìm kiếm</title>
      </Helmet>
      <List
        breadcrumb={[{ title: "Tìm kiếm", type: "/tim-kiem" }]}
        data={queryData as any}
        count={queryCount as any}
        isLoading={isQuerying}
      />
    </>
  );
}

export default ListingPage;
