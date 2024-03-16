import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";

function ChakraBreadcrumb({ page = "" }) {
  return (
    <Breadcrumb fontSize={18} fontFamily="lexend">
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="/">
          Trang chủ
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to={`/${slugify(page.toLowerCase())}`}>
          {page}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default ChakraBreadcrumb;
