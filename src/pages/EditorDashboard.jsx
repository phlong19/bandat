import ChakraTable from "../features/table/ChakraTable";
import TableNewRow from "../features/table/TableNewRow";
import NewsFormModal from "../features/form/NewsFormModal";

import { useAuth } from "../context/UserContext";
import { newsCaptions } from "../constants/anyVariables";

import { news } from "../data/news";

// test
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMedia } from "../services/apiMedia";

function EditorDashboard() {
  const { level } = useAuth();
  const [value, setValue] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteMedia(value),
    onSuccess: (data) => {
      console.log(data);
      toast.success("yay, xoa thanh cong");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div>
      <p>img delete test, fill in file path</p>
      <input
        className="min-w-96 rounded-lg p-3"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="mb-10 ml-2 rounded-md bg-red-500 p-2 duration-300 hover:bg-red-700"
        onClick={mutate}
      >
        {!isPending ? "xoa" : "dang xoa"}
      </button>
      <ChakraTable
        data={news}
        edit
        captions={newsCaptions}
        render={(item) => (
          <TableNewRow data={item} level={level} key={item.id} />
        )}
        primaryButton={<NewsFormModal />}
        title="Quản lý tin tức"
        count={news.length}
      />
    </div>
  );
}

export default EditorDashboard;
