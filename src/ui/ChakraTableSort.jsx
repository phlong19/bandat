import { useSearchParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";

import { sortList, sortNewsList } from "../constants/navlink";
import { HiSortDescending } from "react-icons/hi";

function ChakraTableSort({ news = false, re = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const arr = !news ? sortList : sortNewsList;

  return (
    <Select
      title="Sắp xếp"
      icon={<HiSortDescending />}
      size="md"
      rounded="lg"
      value={searchParams.get("sort") || arr[0].value}
      minW="160px"
      maxW="195px"
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
      {re && (
        <>
          <option value="report-desc">Báo xấu cao</option>
        </>
      )}
    </Select>
  );
}

export default ChakraTableSort;
