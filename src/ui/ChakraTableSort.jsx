import { Select } from "@chakra-ui/react";
import { sortList } from "../constants/navlink";

function ChakraTableSort() {
  return (
    <Select size="md" rounded="lg">
      {sortList.map((i) => (
        <option value={i.value} key={i.value}>
          {i.label}
        </option>
      ))}
    </Select>
  );
}

export default ChakraTableSort;
