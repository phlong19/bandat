import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import unidecode from "unidecode";

function ChakraBreadcrumb({ page = "" }: { page?: string }) {
  const slug = unidecode(page.toLowerCase());
  const link = page === "Admin" ? "/control" : `/${slugify(slug)}`;

  return (
    <Breadcrumb fontSize={18} fontFamily="lexend" id="breadcrumb-scroll">
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="/">
          Trang chủ
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to={link}>
          {page}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default ChakraBreadcrumb;
