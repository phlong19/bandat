// libs
import { motion, AnimatePresence } from "framer-motion";
import { Select } from "@chakra-ui/react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

// UI
import ListItem from "./ListItem";
import Searchbar from "../searchbar/Searchbar";
import ChakraTablePagination from "../../ui/ChakraTablePagination";
import SkeletonList from "../../ui/SkeletonList";
import EmptyList from "../../ui/EmptyList";
import Breadcrumb from "../../ui/BreadCrumb";

// hooks & helpers & context
import { formatNumber } from "../../utils/helper";
import { sortList } from "../../constants/navlink";
import { ListProps } from "../../model";

interface Props {
  breadcrumb?: {
    title: string;
    type: string;
  }[];
  data: ListProps["data"][];
  count?: number;
  isLoading?: boolean;
  userpage?: boolean;
}

function List({
  breadcrumb,
  data,
  count = 0,
  isLoading,
  userpage = false,
}: Props) {
  const location = useLocation();
  const search = location.state?.fullData;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="relative mx-auto h-full min-h-[80%] max-w-[1500px] justify-center px-2.5 sm:px-4 lg:flex lg:gap-2">
      <AnimatePresence presenceAffectsLayout>
        <motion.div
          className={`${
            !userpage ? "min-h-[85dvh]" : "h-fit"
          } z-10 h-full w-full`}
        >
          <h2
            className={`${
              search ? "text-base" : "text-lg"
            } pt-3 font-lexend font-medium`}
          >
            {!userpage &&
              (!search ? (
                <Breadcrumb links={breadcrumb} />
              ) : (
                `Danh sách ${search}`
              ))}
          </h2>
          {!userpage && (
            <div className="py-4">
              <Searchbar />
            </div>
          )}
          <div className="  flex items-center justify-between">
            {/* counter */}
            <span className="inline-block text-sm">
              Có <span>{formatNumber(count)}</span> sản phẩm{" "}
              {breadcrumb?.slice(-1)[0].title.toLowerCase()}.
            </span>

            {count > 0 && (
              <Flex gap={3} align="center">
                {!userpage && (
                  <Select
                    value={searchParams.get("sort") || sortList[0].value}
                    size="xs"
                    rounded="md"
                    minW="160px"
                    onChange={(e) => {
                      searchParams.set("sort", e.target.value);
                      setSearchParams(searchParams);
                    }}
                  >
                    {sortList.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Flex>
            )}
          </div>

          {/* RE list */}
          {isLoading ? (
            <SkeletonList />
          ) : count > 0 ? (
            <>
              <div className="mx-auto mt-3 max-w-[1500px] space-y-4 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5 xl:gap-4">
                {data.map((item, index) => (
                  <ListItem key={index} data={item} />
                ))}
              </div>

              <ChakraTablePagination count={count} news={userpage} />
            </>
          ) : (
            <EmptyList />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default List;
