import supabase, { supabaseUrl } from "./supabase";
import { error as errorMessage } from "../constants/message";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";
import { v4 } from "uuid";

// get news list
export async function getNewsList(page) {
  let query = supabase
    .from("News")
    .select(
      `
        *,
        author: Profile(fullName, avatar)
    `,
    )
    .limit(LIMIT_PER_PAGE)
    .eq("status", true)
    .order("created_at", { ascending: false });

  if (page) {
    const from = (page - 1) * LIMIT_PER_PAGE;
    const to = from + LIMIT_PER_PAGE - 1;
    query = query.range(from, to);
  }
  const { data, count, error } = await query;

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// get single news
export async function getNew(slug) {
  const { data, error } = await supabase
    .from("News")
    .select(`*, author: Profile(fullName, avatar)`)
    .limit(1)
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// create new
export async function createNew(formData) {
  const { files, ...newsData } = formData;

  const fileName = `News - ${v4()}${data.id}`;

  const { data, error: uploadError } = await supabase.storage
    .from("news")
    .upload(fileName, files[0]);

  if (uploadError) {
    console.log(uploadError);
    throw new Error(errorMessage.uploadFailed);
  }

  const { error } = await supabase.from("News").insert([
    {
      ...newsData,
      thumbnail: `${supabaseUrl}/storage/v1/object/public/${data.fullPath} `,
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantCreateNews);
  }

  return null;
}
// update
// delete
