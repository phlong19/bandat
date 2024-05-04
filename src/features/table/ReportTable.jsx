import { useQuery } from "@tanstack/react-query";
import ChakraTable from "./ChakraTable";
import { reportCaptions } from "../../constants/anyVariables";
import TableReportRow from "./TableReportRow";
import { useSearchParams } from "react-router-dom";
import { getReportsByPost } from "../../services/apiReport";

function ReportTable({ id }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["reports-list", id],
    queryFn: () => getReportsByPost(id, page),
    enabled: Boolean(id),
  });

  if (!data && data?.length < 1) {
    return null;
  }

  return (
    <ChakraTable
      captions={reportCaptions}
      data={data}
      isLoading={isLoading}
      count={count}
      render={(item) => <TableReportRow data={item} key={item.id} />}
      title="Danh sách báo cáo bài viết"
      profile={false}
      viewOnly
    />
  );
}

export default ReportTable;
