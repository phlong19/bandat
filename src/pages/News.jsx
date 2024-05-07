import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Center,
  Spinner,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import BreadCrumb from "../ui/BreadCrumb";
import ChakraTablePagination from "../ui/ChakraTablePagination";
import NewsAccordionLinks from "../ui/NewsAccordionLinks";

import { city } from "../data/city";
import { getNewsList, getPopularList } from "../services/apiNews";
import { formatDate } from "../utils/helper";
import { useEffect } from "react";

function News() {
  const summaryColor = useColorModeValue("gray.700", "gray.300");
  const accent = useColorModeValue("primary", "secondary");

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // fetch list news
  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["news", page],
    queryFn: () => getNewsList(page),
  });

  // fetch popular list
  const { data: list, isLoading: isFetching } = useQuery({
    queryKey: ["popular-news"],
    queryFn: () => getPopularList(),
    staleTime: Infinity,
  });

  useEffect(() => {
    document.title = "Thông tin bất động sản Việt Nam cập nhật mới nhất";
  }, []);

  return (
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
      <BreadCrumb />
      <div className="max-w-full bg-white dark:bg-darker">
        <div className="mx-auto flex max-w-[800px] flex-col items-center py-10 text-center">
          <h1 className="font-lexend text-2xl font-bold md:text-4xl">
            Tin tức bất động sản mới nhất
          </h1>
          <p className="p-3 font-lexend text-base lg:text-xl">
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam
            thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo
            sát thực tế của đội ngũ phóng viên, biên tập của LandHub.com.vn.
          </p>
        </div>
      </div>

      {/* main content */}
      {isLoading ? (
        <Center minH="50dvh">
          <Spinner />
        </Center>
      ) : data && data?.length < 1 ? (
        <Center minH="50dvh">
          <Text fontSize="lg">Hiện không có bài viết tin tức.</Text>
        </Center>
      ) : (
        <div className=" justify-center bg-white dark:bg-darker lg:flex">
          <div className="rounded-md bg-white px-3.5 dark:bg-darker">
            {data.map((item, i) => (
              <Link to={`/tin-tuc/` + item.slug} key={i}>
                <div className="group mb-5 rounded-md bg-light shadow-md dark:bg-dark lg:flex lg:max-w-[800px] lg:items-center lg:border-b lg:bg-light lg:py-3 lg:shadow-none ">
                  <img
                    src={item.thumbnail}
                    className="h-[250px] w-full rounded-md object-cover md:ml-3 lg:h-[150px] lg:w-[260px] lg:min-w-[260px] lg:max-w-[260px]"
                  />
                  <div className="p-3">
                    <h1 className="py-2 font-montserrat text-base font-semibold transition-colors duration-300 group-hover:text-primary dark:group-hover:text-secondary lg:py-1 lg:text-lg lg:font-bold">
                      {item.title}
                    </h1>
                    <chakra.i color={accent}>
                      {formatDate(item.created_at)}
                    </chakra.i>
                    <chakra.p
                      color={summaryColor}
                      className="line-clamp-3 font-roboto"
                    >
                      {item.summary}
                    </chakra.p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex justify-center">
              <ChakraTablePagination count={count} news />
            </div>
          </div>

          <div className="lg:max-w-[300px] ">
            <div>
              <div className="rounded-md border-[1px] bg-white p-3 dark:bg-dark">
                <h1 className="text-center text-xl font-bold">Tin nổi bật</h1>
                {isFetching ? (
                  <Center h="300" w="full">
                    <Spinner size="sm" thickness="2px" />
                  </Center>
                ) : (
                  <>
                    {list.map((item, i) => (
                      <Link
                        to={`/tin-tuc/` + item.slug}
                        key={i}
                        className="transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
                      >
                        <div key={i} className="py-3">
                          <i className="text-gray-400">{item.date}</i>
                          <h1 className="line-clamp-3 font-montserrat font-semibold">
                            {item.title}
                          </h1>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
              <div className="mt-5">
                <div className="rounded-md border bg-white p-3 dark:bg-dark">
                  <h1 className="text-center text-lg font-semibold">
                    Thị trường BDS tại 10 tỉnh/thành phố lớn
                  </h1>
                  {/* considering remove in the future */}
                  {city.map((item, i) => (
                    <div key={i} className="flex items-center p-3">
                      <img src={item.img} className="h-10 w-20 rounded-xl" />
                      <h1 className="pl-3">{item.cityname}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pt-4">
        <NewsAccordionLinks />
      </div>
    </div>
  );
}

export default News;
