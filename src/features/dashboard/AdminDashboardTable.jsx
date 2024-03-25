import ChakraTable from "../table/ChakraTable";
import TableDocRow from "../table/TableDocRow";

function AdminDashboardTable({ count, data }) {
  return (
    <ChakraTable
      captions={["ID", "Tên", "Ngày tạo"]}
      count={count}
      data={data}
      render={(item) => <TableDocRow data={item} key={item.doc_id} />}
      title="Danh sách giấy tờ, tài liệu pháp lý"
    />
  );
}

export default AdminDashboardTable;
