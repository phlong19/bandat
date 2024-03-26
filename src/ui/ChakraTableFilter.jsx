import { Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { filterList, filterNewsList } from "../constants/navlink";

function ChakraTableFilter({ news }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const arr = !news ? filterList : filterNewsList;

  return (
    <Select
      size="md"
      rounded="lg"
      value={searchParams.get("filter") || "none"}
      minW="125px"
      maxW="130px"
      onChange={(e) => {
        searchParams.set("filter", e.target.value);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }}
    >
      <option value="none">Tất cả</option>
      {arr.map((i) => (
        <option value={i.value} key={i.value}>
          {i.label}
        </option>
      ))}
    </Select>
  );
}

export default ChakraTableFilter;
