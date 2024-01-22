import { useSearchParams } from "react-router-dom";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";
import PaginationButton from "./PaginationButton";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useMapView } from "../context/MapViewContext";

const totalItems = 288;
// const totalPages = 14;

function Pagination() {
  const { mapView } = useMapView();
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
    <div
      className={`${
        !mapView && "lg:pr-2 xl:pr-6"
      } flex justify-center gap-2 py-4 pr-1 lg:justify-end lg:pt-7`}
    >
      <PaginationButton
        icon={<FaAngleDoubleLeft />}
        disabled={currentPage < 2}
        onClick={() => handlePagination("prev")}
      />

      {currentPage > 2 && (
        <PaginationButton onClick={() => handlePagination("first")}>
          1
        </PaginationButton>
      )}
      {currentPage > 4 && <span className="pt-2">...</span>}
      {currentPage > 3 && (
        <PaginationButton onClick={() => handlePagination("prev2")}>
          {currentPage - 2}
        </PaginationButton>
      )}
      {currentPage > 1 && (
        <PaginationButton onClick={() => handlePagination("prev")}>
          {currentPage - 1}
        </PaginationButton>
      )}
      <PaginationButton disabled={true} type="fill">
        {currentPage}
      </PaginationButton>
      {currentPage !== totalPages && (
        <PaginationButton onClick={() => handlePagination("next")}>
          {currentPage + 1}
        </PaginationButton>
      )}
      {currentPage < totalPages - 3 && (
        <PaginationButton onClick={() => handlePagination("next2")}>
          {currentPage + 2}
        </PaginationButton>
      )}
      {currentPage < totalPages - 5 && <span className="pt-2">...</span>}
      {currentPage < totalPages - 1 && (
        <PaginationButton onClick={() => handlePagination("last")}>
          {totalPages}
        </PaginationButton>
      )}
      <PaginationButton
        icon={<FaAngleDoubleRight />}
        disabled={currentPage === totalPages}
        onClick={() => handlePagination("next")}
      />
    </div>
  );
}

export default Pagination;
