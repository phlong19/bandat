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

import { checkProduct } from "../../services/apiProduct";
import { maxLength, minLength } from "../../constants/anyVariables";
import unidecode from "unidecode";

function NameInput({ postId, register, error }) {
  let invalid = false;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["query-product-name", debouncedSearch],
    queryFn: () => checkProduct(debouncedSearch),
    enabled: search.length >= minLength,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > minLength && search.length < maxLength) {
        const formattedTitle = unidecode(search);
        const slug = slugify(formattedTitle);
        setDebouncedSearch(slug);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (!isLoading && data?.length > 0 && data[0].id !== postId) {
    invalid = true;
  }

  return (
    <FormControl isRequired isInvalid={error || invalid}>
      <Flex align="baseline" gap={1}>
        <FormLabel>Tên sản phẩm</FormLabel>
        {isLoading ? (
          <Spinner size="xs" ml={2} speed="0.3s" />
        ) : invalid ? (
          <Badge colorScheme="red" borderRadius="sm" textTransform="capitalize">
            <span className="px-[3px] text-[11px]">Sản phẩm đã tồn tại</span>
          </Badge>
        ) : (
          <Badge
            colorScheme="green"
            borderRadius="md"
            textTransform="capitalize"
          >
            <span className="px-[3px] text-[11px]">Tên phù hợp</span>
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
