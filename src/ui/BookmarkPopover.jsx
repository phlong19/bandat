import { useEffect, useState } from "react";
import {
  Center,
  Box,
  Link as ChakraLink,
  Flex,
  Spinner,
  Avatar,
  Tag,
  TagLabel,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getCookie } from "../utils/reuse";
import { formatCurrencyWOText } from "../utils/helper";
import { getBookmarkProducts } from "../services/apiProduct";

function BookmarkPopover() {
  const [values, setValues] = useState(getCookie());
  const ids = values?.split(",") || [];

  const {
    data: { data, count } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookmark-list", ids],
    queryFn: () => getBookmarkProducts(ids),
    enabled: ids[0] !== "",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCookieValues = getCookie();
      if (newCookieValues !== values) {
        setValues(newCookieValues);
        // Trigger refetch when the cookie changes
        refetch();
      }
    }, 1500); // Check every second for changes

    return () => clearInterval(intervalId);
  }, [values, refetch]);

  if (isLoading) {
    return (
      <Center minH={300}>
        <Spinner />
      </Center>
    );
  }

  if (count < 1 || ids.length == 0 || !data || data?.length < 1) {
    return (
      <Center minH={300}>
        <Text>Hiện không lưu sản phẩm nào.</Text>
      </Center>
    );
  }

  return (
    <Flex flexDirection="column" gap={3}>
      {data.slice(0, 5).map((i, index) => (
        <Box key={i.id} title={i.name}>
          <Link
            to={`/san-pham/${i.slug}`}
            className="group flex items-start gap-2.5"
          >
            <Avatar boxSize="38px" src={i.images[0].mediaLink} />
            <Box>
              <h3
                className="mb-1 line-clamp-2 text-ellipsis whitespace-normal
              break-words text-xs capitalize text-black transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-secondary"
              >
                {i.name}
              </h3>
              <Text noOfLines={1} fontSize="11.5" color="gray">
                {i.summary}
              </Text>
            </Box>
          </Link>
          <div className="flex items-center justify-end gap-3 font-roboto text-xs font-semibold text-primary dark:text-secondary">
            <Tag
              size="xs"
              variant="outline"
              border="none"
              boxShadow="none"
              fontSize="xs"
            >
              <TagLabel>{i.status.type}</TagLabel>
            </Tag>{" "}
            -
            <Flex gap={1}>
              <span>{formatCurrencyWOText(i.price)}</span>
            </Flex>
          </div>
          {index != count - 1 && <Divider my={1} borderBottomWidth={2} />}
        </Box>
      ))}

      <Box>
        <ChakraLink to="/san-pham-da-luu" as={Link} fontSize="13px">
          Xem đầy đủ
        </ChakraLink>
      </Box>
    </Flex>
  );
}

export default BookmarkPopover;
