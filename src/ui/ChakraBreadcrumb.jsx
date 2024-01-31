import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function ChakraBreadcrumb({ page }) {
  return (
    <Breadcrumb fontSize={18} fontFamily="lexend">
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="/">
          Trang chủ
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to={`/${page}`}>
          {page}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default ChakraBreadcrumb;
