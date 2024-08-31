import supabase, { category } from "./supabase";
import { error as errMessage } from "../constants/message";
import { Links } from "../constants/navlink";
/**
 * get all categories for header render
 */
export async function getAllCategories() {
  const { data, count, error } = await supabase
    .from(category)
    .select(`*`, { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error(errMessage.fetchError);
  }

  const categoryTree = data.reduce((group: Links[], cur) => {
    if (cur.parent === null) {
      const key = cur.id;

      group.push({
        id: key,
        title: cur.name,
        type: cur.slug,
        child_links: data
          .filter((i) => i.parent === key)
          .map((i) => ({
            id: i.id,
            title: i.name,
            type: i.slug,
            child: data
              .filter((c) => c.parent === i.id)
              .map((link) => ({
                id: link.id,
                title: link.name,
                type: link.slug,
              })),
          })),
      });
    }

    return group;
  }, []);

  return { categoryTree, count };
}
