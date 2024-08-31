import supabase, { category, product, profile } from "./supabase";
import {
  ADMIN_LEVEL,
  EXPRIRY_LENGTH,
  INSTOCK,
  LIMIT_PER_PAGE,
  maxLength,
  minLength,
  OUT_STOCK,
} from "../constants/anyVariables";
import { error as errorMessage } from "../constants/message";
import { getStatusID, sanitizeSearchInput } from "../utils/helper";

//#region get
/**
 * get product list at client page
 * @param type category from location pathname
 * @param sort searchParams
 * @param page pagination
 */
export async function getList(type: string, sort: string, page: number) {
  const from = (page - 1) * LIMIT_PER_PAGE;
  const to = from + LIMIT_PER_PAGE - 1;

  //   get catID
  const { data: cat, error: catError } = await supabase
    .from(category)
    .select(`*`)
    .eq("slug", type)
    .limit(1)
    .single();

  if (catError) {
    console.log(catError);
    throw new Error(errorMessage.fetchError);
  }

  const catId = cat.id;

  let query = supabase
    .from(product)
    .select(
      `*,
        images: product_image(*),
        status(*)  
    `,
      { count: "exact" },
    )
    .eq("images.isImage", true)
    // .eq("status", INSTOCK)
    .or(
      `rootCategory.eq.${catId},parentCategory.eq.${catId},category.eq.${catId}`,
    )
    .limit(LIMIT_PER_PAGE)
    .range(from, to);

  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

/**
 * query products from local storage cart: array of ids
 */
export async function getCartProducts(ids: number[]) {
  const { data, error } = await supabase
    .from(product)
    .select(
      `*,  
        images: product_image(*), 
        status(*)
      `,
    )
    .in("id", ids)
    .eq("images.isImage", true);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

/**
 * @param ids array string of id split from local storage
 * @param page search params
 */
export async function getBookmarkProducts(ids: string[], page?: number) {
  let query = supabase
    .from(product)
    .select(
      `*,  
        images: product_image(*), 
        status(*)
      `,
      { count: "exact" },
    )
    .in("id", ids)
    .eq("images.isImage", true);

  if (!page) {
    query = query.limit(5);
  } else {
    // pagination
    const start = (page - 1) * LIMIT_PER_PAGE;
    const end = start + LIMIT_PER_PAGE - 1;
    query = query.limit(LIMIT_PER_PAGE).range(start, end);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

/**
 * check is there any product existed
 * @param slug a slugify string from input
 */
export async function checkProduct(slug: string) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  const { data, error } = await supabase
    .from(product)
    .select("id")
    .limit(1)
    .eq("slug", slug);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

/**
 * get single product details
 * @param slug string
 */
export async function getProduct(slug: string) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  let query = supabase
    .from(product)
    .select(
      `*,
        medias: product_image(*),
        rootCategory: category!product_rootCategory_fkey(*),
        parentCategory: category!product_parentCategory_fkey(*),
        category: category!product_category_fkey(*),
        status(*)
      `,
    )
    .limit(1)
    .eq("slug", slug)
    .eq("status", INSTOCK);

  const { data, error } = await query.single();

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  return data;
}
//#end_region

//#region crud product
/**
 * create product
 * @param formData submit form object
 */
export async function createProduct(formData: Record<string, string | number>) {
  return null;
}

/**
 * update Product
 * @param formData
 */
export async function updateProduct(formData: any) {
  return null;
}

// some quick action

//#endregion

//#region manage product
/**
 * get full product list for management
 *
 */
export async function getFullProductList(
  userID: number,
  sort: string,
  filter: string,
  textQuery: string,
  page: number,
) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  const { data: userProfile, error: getProfileError } = await supabase
    .from(profile)
    .select("id, level")
    .limit(1)
    .eq("id", userID)
    .single();

  if (getProfileError) {
    throw new Error(getProfileError.message);
  }

  const { level } = userProfile;

  if (!level || level < ADMIN_LEVEL) {
    return;
  }

  let query = supabase
    .from(product)
    .select(
      `*,
        images: product_image(*),
        status(*)
      `,
      { count: "exact" },
    )
    .eq('images.isImage',true)
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  // sort
  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // filter
  if (filter !== "none" && filter !== "status-expired") {
    const [col, status] = filter.split("-");
    const id = getStatusID(status);
    query = query.eq(col, id);
  } 

  // text query
  if (textQuery !== "" && textQuery?.length > 2) {
    query = query.textSearch("name", sanitizeSearchInput(textQuery));
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

/**
 * get single product for management
 */
export async function getFullProduct(slug: string,level:number) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  let query = supabase
    .from(product)
    .select(
      `*,
        medias: product_image(*),
        rootCategory: category!product_rootCategory_fkey(*),
        parentCategory: category!product_parentCategory_fkey(*),
        category: category!product_category_fkey(*),
        status(*)
  `,
    )
    .limit(1)
    .eq("slug", slug);

  if (!level || level < ADMIN_LEVEL) {
    return;
  }

  const { data, error } = await query.single();

  if (error) {
    console.log(error.message);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}
//#endregion
