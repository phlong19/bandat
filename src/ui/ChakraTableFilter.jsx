import { Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { filterList } from "../constants/navlink";

function ChakraTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("filter"));
  return (
    <Select
      size="md"
      rounded="lg"
      value={searchParams.get("filter") || "none"}
      minW="125px"
      maxW="130px"
      onChange={(e) => {
        searchParams.set("filter", e.target.value);
        setSearchParams(searchParams);
      }}
    >
      <option value="none">Tất cả</option>
      {filterList.map((i) => (
        <option value={i.value} key={i.value}>
          {i.label}
        </option>
      ))}
    </Select>
  );
}

export default ChakraTableFilter;
