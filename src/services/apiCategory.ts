import supabase, { category } from "./supabase";
import { error as errMessage } from "../constants/message";
import { Links } from "../constants/navlink";
/**
 * get all categories for header render
 * @returns
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

  return { categoryTree, count, data };
}

interface FormData {
  form: {
    id: number;
    name: string;
    parent?: number | null;
    slug: string;
  };
  isEdit: boolean;
}

/**
 *
 * @param formData
 */
export async function updateCategory(formData: FormData) {
  const {
    form: { id, name, slug, parent },
    isEdit,
  } = formData;

  let query = supabase.from(category);

  if (isEdit) {
    query = query.update({ name, slug, parent }).eq("id", id);
  } else {
    query = query.insert([{ name, slug, parent }]);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Không thể cập nhật danh mục, thử lại sau");
  }

  if (data.length < 1) {
    throw new Error(errMessage.cantFindToUpdate);
  }

  return data;
}

/**
 * delete category by id
 */
export async function deleteCategory(id: number) {
  const { data, error } = await supabase
    .from(category)
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Không thể xóa danh mục, thử lại sau");
  }

  if (data.length < 1) {
    throw new Error(errMessage.cantFindToDelete);
  }

  return data;
}
