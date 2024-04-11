import {
  Center,
  Box,
  Flex,
  Spinner,
  Avatar,
  Tag,
  TagLeftIcon,
  TagLabel,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PiFrameCornersLight } from "react-icons/pi";

import { getBookmarkedPosts } from "../services/apiRE";
import { getCookie } from "../utils/reuse";
import { formatCurrency, pricePerArea } from "../utils/helper";
import { m2 } from "../constants/anyVariables";

function BookmarkPopover() {
  const values = getCookie();
  const ids = values?.split(",") || [];

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["bookmark-list", ids],
    queryFn: () => getBookmarkedPosts(ids),
    enabled: Boolean(ids?.length),
  });

  if (isLoading) {
    return (
      <Center minH={300}>
        <Spinner />
      </Center>
    );
  }

  if (count < 1 || ids.length == 0) {
    return (
      <Center minH={300}>
        <Text>Hiện không lưu bài viết nào.</Text>
      </Center>
    );
  }

  return (
    <Flex flexDirection="column" gap={3}>
      {data.map((i, index) => (
        <Box key={i.id} title={i.name}>
          <Link
            to={`/nha-dat/${i.slug}`}
            className="group flex items-start justify-between gap-2.5"
          >
            <Avatar boxSize="38px" src={i.images[0].mediaLink} />
            <h3
              className="mb-1 line-clamp-2 text-ellipsis whitespace-normal
                break-words text-xs capitalize text-black transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-secondary"
            >
              {i.name}
            </h3>
          </Link>
          <div className="flex items-center justify-end gap-3 font-roboto text-xs font-semibold text-primary dark:text-secondary">
            <Tag
              size="xs"
              variant="outline"
              border="none"
              boxShadow="none"
              fontSize="xs"
            >
              <TagLeftIcon as={PiFrameCornersLight} />
              <TagLabel>{i.area + m2}</TagLabel>
            </Tag>{" "}
            -
            <Flex gap={1}>
              <span>
                {formatCurrency(i.price)} {!i.purType && "/ tháng"}
              </span>
              {i.purType && (
                <span className="text-black dark:text-white">-</span>
              )}
              {i.purType && (
                <span className="font-semibold text-primary dark:text-secondary">
                  {formatCurrency(pricePerArea(i.purType, i.price, i.area))}/
                  {m2}
                </span>
              )}
            </Flex>
          </div>
          {index != count - 1 && <Divider my={1} borderBottomWidth={2} />}
        </Box>
      ))}
    </Flex>
  );
}

export default BookmarkPopover;