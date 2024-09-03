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
import { uploadMedia, deleteMedia } from "./apiMedia";

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
  if (!slug || slug.length < minLength || slug.length > maxLength) {
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
  if (!slug || slug.length < minLength || slug.length > maxLength) {
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
//#endregion

//#region crud product
/**
 * create product
 * @param formData submit form object
 */
export async function createProduct(formData: any) {
  const { files, ...form } = formData;

  const { data, error } = await supabase
    .from(product)
    .insert([form])
    .select(`id`)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantCreate);
  }

  const productID = data.id;

  files.images.forEach((file: any) => uploadMedia(file, productID));
  files.videos.forEach((file: any) => uploadMedia(file, productID));

  return null;
}

/**
 * update Product
 * @param formData
 */
export async function updateProduct(formData: any) {
  const { files: _, deleteMedias, newMedias, id, ...form } = formData;

  const { data, error } = await supabase
    .from(product)
    .update(form)
    .eq("id", id)
    .select(`id`);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  // handle new medias
  newMedias.images.forEach(async (file: any) => await uploadMedia(file, id));
  newMedias.videos.forEach(async (file: any) => await uploadMedia(file, id));

  // handle delete old medias
  if (deleteMedias.length > 0) {
    deleteMedias.forEach(
      async (file: any) =>
        await deleteMedia(file).then(() =>
          console.log("Delete media successfully"),
        ),
    );
  }

  return data;
}

// some quick actions
export async function updateStatus(params: {
  statusID: number;
  productID: number;
}) {
  const { productID, statusID } = params;
  const { data, error } = await supabase
    .from(product)
    .update({ status: statusID })
    .eq("id", productID)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return data;
}

/**
 * @param productID productID
 * @param userID current userID
 */
export async function deleteProduct({ productID }: { productID: number }) {
  const { data, error } = await supabase
    .from(product)
    .delete()
    .eq("id", productID)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantDelete);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToDelete);
  }

  return null;
}

//#endregion

//#region manage product
/**
 * get full product list for management
 *
 */
export async function getFullProductList(
  userID: string,
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
    .eq("images.isImage", true)
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
  if (filter !== "none") {
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
export async function getFullProduct(slug: string, level: number) {
  if (!slug || slug.length < minLength || slug.length > maxLength) {
    return null;
  }

  // rootCategory: category!product_rootCategory_fkey(*),
  // parentCategory: category!product_parentCategory_fkey(*),
  // category: category!product_category_fkey(*),

  let query = supabase
    .from(product)
    .select(
      `*,
        images: product_image(*),
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
