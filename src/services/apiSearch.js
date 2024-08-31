import supabase, { product } from "./supabase";
import { error as errorMessage } from "../constants/message";
import { LIMIT_PER_PAGE, INSTOCK } from "../constants/anyVariables";
import { sanitizeSearchInput } from "../utils/helper";

/**
 *
 * @param {*} query text search
 * @param {*} sort sort
 * @param {*} page search param
 * @returns
 */
export async function queryList(query, sort, page) {
  if (!query) return;

  const from = (page - 1) * LIMIT_PER_PAGE;
  const to = from + LIMIT_PER_PAGE - 1;

  let supabaseQuery = supabase
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
    .range(from, to);

  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    supabaseQuery = supabaseQuery.order(col, { ascending: order === "asc" });
  } else {
    supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
  }

  // search input
  if (query) {
    supabaseQuery = supabaseQuery.textSearch(
      "name",
      sanitizeSearchInput(query),
    );
  }

  const { data, count, error } = await supabaseQuery;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
