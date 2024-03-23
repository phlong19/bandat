import { Flex, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useMapView } from "../context/MapViewContext";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";

function ChakraTablePagination({ count, news = false }) {
  const { setMapView } = useMapView();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(count / LIMIT_PER_PAGE);

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
    setTimeout(() => {
      document.getElementById("breadcrumb-scroll")?.scrollIntoView();
    }, 100);
    setMapView(false);
    searchParams.set("page", finalDestination.toString());
    setSearchParams(searchParams);
  }

  if (count <= 1) {
    return null;
  }

  return (
    <Flex gap={2} justifyContent="end" py={8} pr={news ? 0 : 6}>
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
      <Button colorScheme="green" fontSize="sm">
        {currentPage}
      </Button>
      {currentPage !== totalPages && (
        <Button variant="pagi" onClick={() => handlePagination("next")}>
          {currentPage + 1}
        </Button>
      )}
      {currentPage < totalPages - 2 && (
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
        variant={currentPage !== totalPages ? "pagi" : ""}
        isDisabled={currentPage === totalPages}
        onClick={() => handlePagination("next")}
      >
        <FaAngleDoubleRight />
      </Button>
    </Flex>
  );
}

export default ChakraTablePagination;
