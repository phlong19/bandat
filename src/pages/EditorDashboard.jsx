import ChakraTable from "../features/table/ChakraTable";
import TableNewRow from "../features/table/TableNewRow";
import NewsFormModal from "../features/form/NewsFormModal";

import { useAuth } from "../context/UserContext";
import { newsCaptions } from "../constants/anyVariables";

import { news } from "../data/news";

function EditorDashboard() {
  const { level } = useAuth();

  return (
    <div>
      <ChakraTable
        data={news}
        edit
        captions={newsCaptions}
        render={(item) => (
          <TableNewRow data={item} level={level} key={item.id} />
        )}
        primaryButton={<NewsFormModal />}
      />
    </div>
  );
}

export default EditorDashboard;
