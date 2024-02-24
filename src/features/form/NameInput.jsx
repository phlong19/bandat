import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import slugify from "react-slugify";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Badge,
  Flex,
  Spinner,
} from "@chakra-ui/react";

import { checkPost } from "../../services/apiRE";
import { maxLength, minLength } from "../../constants/anyVariables";

function NameInput({ postId, register, error }) {
  let invalid = false;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["query-title"],
    queryFn: () => checkPost(debouncedSearch),
    enabled: search.length >= minLength,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > minLength && search.length < maxLength) {
        const slug = slugify(search);
        setDebouncedSearch(slug);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, invalid]);

  if (!isLoading && data?.length > 0 && data[0].id !== postId) {
    invalid = true;
  }

  return (
    <FormControl isRequired isInvalid={error || invalid}>
      <Flex align="baseline" gap={1}>
        <FormLabel>Tiêu đề</FormLabel>
        {isLoading ? (
          <Spinner size="xs" ml={2} speed="0.3s" />
        ) : invalid ? (
          <Badge colorScheme="red" borderRadius="sm" textTransform="capitalize">
            <span className="px-[3px]">Tiêu đề đã tồn tại</span>
          </Badge>
        ) : (
          <Badge
            colorScheme="green"
            borderRadius="md"
            textTransform="capitalize"
          >
            <span className="px-[3px]">Tiêu đề phù hợp</span>
          </Badge>
        )}
      </Flex>
      <Input
        type="text"
        {...register}
        onChange={(e) => {
          invalid = false;
          setSearch(e.target.value);
        }}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export default NameInput;
