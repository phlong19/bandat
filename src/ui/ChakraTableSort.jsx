import { useSearchParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";

import { sortList, sortNewsList } from "../constants/navlink";

function ChakraTableSort({ news = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const arr = !news ? sortList : sortNewsList;

  return (
    <Select
      size="md"
      rounded="lg"
      value={searchParams.get("sort") || arr[0].value}
      minW="160px"
      onChange={(e) => {
        searchParams.set("sort", e.target.value);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }}
    >
      {arr.map((i) => (
        <option value={i.value} key={i.value}>
          {i.label}
        </option>
      ))}
    </Select>
  );
}

export default ChakraTableSort;
