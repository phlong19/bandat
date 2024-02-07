import { useSearchParams } from "react-router-dom";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import { Flex, Button, useColorModeValue } from "@chakra-ui/react";

const totalItems = 288;
// const totalPages = 14;

function ChakraTablePagination() {
  const currentPageColor = useColorModeValue("blue", "yellow");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const totalPages = Math.ceil(totalItems / LIMIT_PER_PAGE);
  let finalDestination;

  function handlePagination(to) {
    switch (to) {
      case "first":
        finalDestination = 1;
        break;
      case "prev2":
        finalDestination = currentPage < 3 ? currentPage : currentPage - 2;
        break;
      case "prev":
        finalDestination = currentPage === 1 ? currentPage : currentPage - 1;
        break;
      case "next":
        finalDestination =
          currentPage === totalPages ? currentPage : currentPage + 1;
        break;
      case "next2":
        finalDestination =
          currentPage > totalPages - 3 ? currentPage : currentPage + 2;
        break;
      case "last":
        finalDestination = totalPages;
        break;
      default:
        break;
    }
    searchParams.set("page", finalDestination.toString());
    setSearchParams(searchParams);
  }

  return (
    <Flex gap={2} justifyContent="end" py={8} pr={6}>
      <Button
        variant={currentPage >= 2 ? "pagi" : ""}
        isDisabled={currentPage < 2}
        onClick={() => handlePagination("prev")}
      >
        <FaAngleDoubleLeft />
      </Button>

      {currentPage > 2 && (
        <Button variant="pagi" onClick={() => handlePagination("first")}>
          1
        </Button>
      )}
      {currentPage > 4 && <span className="pt-2">...</span>}
      {currentPage > 3 && (
        <Button variant="pagi" onClick={() => handlePagination("prev2")}>
          {currentPage - 2}
        </Button>
      )}
      {currentPage > 1 && (
        <Button variant="pagi" onClick={() => handlePagination("prev")}>
          {currentPage - 1}
        </Button>
      )}
      <Button
        colorScheme={currentPageColor}
        isDisabled={true}
        cursor="not-allowed"
      >
        {currentPage}
      </Button>
      {currentPage !== totalPages && (
        <Button variant="pagi" onClick={() => handlePagination("next")}>
          {currentPage + 1}
        </Button>
      )}
      {currentPage < totalPages - 3 && (
        <Button variant="pagi" onClick={() => handlePagination("next2")}>
          {currentPage + 2}
        </Button>
      )}
      {currentPage < totalPages - 5 && <span className="pt-2">...</span>}
      {currentPage < totalPages - 1 && (
        <Button variant="pagi" onClick={() => handlePagination("last")}>
          {totalPages}
        </Button>
      )}
      <Button
        variant="pagi"
        isDisabled={currentPage === totalPages}
        onClick={() => handlePagination("next")}
      >
        <FaAngleDoubleRight />
      </Button>
    </Flex>
  );
}

export default ChakraTablePagination;
