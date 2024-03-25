import { useSearchParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";

import { sortList } from "../constants/navlink";

function ChakraTableSort() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Select
      size="md"
      rounded="lg"
      value={searchParams.get("sort") || sortList[0].value}
      minW="160px"
      onChange={(e) => {
        searchParams.set("sort", e.target.value);
        setSearchParams(searchParams);
      }}
    >
      {sortList.map((i) => (
        <option value={i.value} key={i.value}>
          {i.label}
        </option>
      ))}
    </Select>
  );
}

export default ChakraTableSort;
