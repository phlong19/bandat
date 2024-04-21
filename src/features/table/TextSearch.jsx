import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import { MdOutlineClear } from "react-icons/md";

function TextSearch({ setQuery, viewOnly, profile }) {
  const [search, setSearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const option = searchParams.get("option") || "fullName";

  const check = viewOnly && profile;
  const holder = option === "fullName" ? "Tìm theo tên" : "Tìm theo email";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search?.length > 2 || search === "") {
        setQuery(search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setQuery]);

  return (
    <InputGroup minW="200">
      {check && (
        <InputLeftElement minW="100">
          <Select
            defaultValue={option}
            value={option}
            onChange={(e) => {
              searchParams.set("option", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            <option value="fullName">Tên</option>
            <option value="email">Email</option>
          </Select>
        </InputLeftElement>
      )}
      <Input
        pl={check ? "115px" : ""}
        placeholder={!check ? "Tìm theo tên" : holder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputRightElement>
        <Tooltip label="Clear">
          <IconButton
            icon={<MdOutlineClear />}
            size="xs"
            variant="ghost"
            colorScheme="green"
            onClick={() => setSearch("")}
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}

export default TextSearch;
