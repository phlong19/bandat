import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Center,
  Flex,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import BreadCrumb from "../ui/BreadCrumb";
import { navLinks } from "../constants/navlink";
import { Link, useSearchParams } from "react-router-dom";
import { getBookmarkedPosts } from "../services/apiRE";
import { getCookie } from "../utils/reuse";
import List from "../features/list/List";

function Bookmarks() {
  const bg = useColorModeValue("white", "darker");
  const accent = useColorModeValue("primary", "secondary");
  const [values, setValues] = useState(getCookie());
  const ids = values?.split(",") || [];
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data, count } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookmark-list", ids],
    queryFn: () => getBookmarkedPosts(ids, false, page),
    enabled: ids[0] !== "",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  return (
    <Box maxW="1500px" mx="auto">
      <>
        <BreadCrumb base="Tin đã lưu" />
        <Flex
          gap={2}
          w="full"
          justify="center"
          flexDirection={{ base: "column", lg: "row" }}
          bg={bg}
        >
          <Box pt={5} maxH={{ base: "auto", xl: count < 5 ? 760 : "850" }}>
            <Heading color={accent} size="md" pl={3}>
              Danh sách bài đăng đã lưu
            </Heading>
            <List
              data={data}
              isLoading={isLoading}
              count={count}
              userpage
              bmk
            />
          </Box>
          <Box py={5} minW={{ base: "full", lg: 300, xl: 400 }}>
            {navLinks.map((i, index) => (
              <Box key={index} pl={8} pr={3}>
                <Link
                  className="text-md font-bold text-primary hover:text-darker dark:text-secondary dark:hover:text-light"
                  to={`/${i.to}`}
                >
                  {i.title}
                </Link>
                <UnorderedList className="contacts">
                  {i.child_links.map((e) => (
                    <ListItem
                      key={e.type}
                      className="py-1 text-sm transition-colors duration-300 last:pb-3 hover:text-primary dark:hover:text-secondary"
                    >
                      <Link to={`/${i.to}/${e.type}`}>{e.title}</Link>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            ))}
          </Box>
        </Flex>
      </>
    </Box>
  );
}

export default Bookmarks;
