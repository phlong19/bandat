import ChakraTable from "../features/table/ChakraTable";
import TableNewRow from "../features/table/TableNewRow";
import { useAuth } from "../context/UserContext";

import { news } from "../data/news";
import { newsCaptions } from "../constants/anyVariables";

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
      />
    </div>
  );
}

export default EditorDashboard;
