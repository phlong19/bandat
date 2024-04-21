import supabase, { supabaseUrl } from "./supabase";
import { error as errorMessage } from "../constants/message";
import { ADMIN_LEVEL, LIMIT_NEWS } from "../constants/anyVariables";
import { v4 } from "uuid";

// get news list
export async function getNewsList(page) {
  const from = (page - 1) * LIMIT_NEWS;
  const to = from + LIMIT_NEWS - 1;

  const { data, count, error } = await supabase
    .from("News")
    .select(
      `
      *,
      author: Profile(fullName, avatar)
  `,
      { count: "exact" },
    )
    .limit(LIMIT_NEWS)
    .eq("status", true)
    .order("created_at", { ascending: false })
    .range(from, to);

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
  // check is post exist
  const { data: post, error: getPostError } = await supabase
    .from("News")
    .select(`id`)
    .eq("slug", formData.slug);

  if (getPostError) {
    console.log(getPostError);
    throw new Error(errorMessage.fetchError);
  }

  // a news with that slug already existed
  if (post.length > 0) {
    throw new Error(errorMessage.newsExisted);
  }

  const { files, ...newsData } = formData;
  const fileName = `News - ${v4()}`;

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
      thumbnail: `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`,
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantCreateNews);
  }

  return null;
}

// update
export async function updateNews(formData) {
  // console.log(formData);
  // throw new Error("hi");
  const { postID, authorID, userID, level, files, oldFiles, ...data } =
    formData;

  if (level < ADMIN_LEVEL && userID !== authorID) {
    throw new Error(errorMessage.notAuthor);
  }

  // if files has id => new thumb
  let uploadedFile;
  if (files[0]?.id) {
    // delete old thumb
    const oldFileName = oldFiles[0].split("/").pop();
    const { data: removeFile, error: removeError } = await supabase.storage
      .from("news")
      .remove([oldFileName]);

    if (removeError) {
      console.error(removeError);
    }
    console.log("removed:");
    console.log(removeFile);

    // upload new thumb
    const fileName = `News - ${v4()}`;
    const { data, error } = await supabase.storage
      .from("news")
      .upload(fileName, files[0]);

    if (error) {
      console.log(error);
      throw new Error(errorMessage.uploadFailed);
    }

    uploadedFile = data.fullPath;
  }

  const { data: updatedNews, error } = await supabase
    .from("News")
    .update({
      ...data,
      // if new file uploaded patch, or else just patch with old file url
      thumbnail: uploadedFile
        ? `${supabaseUrl}/storage/v1/object/public/${uploadedFile}`
        : oldFiles[0],
    })
    .eq("id", postID)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdate);
  }

  if (updatedNews.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return null;
}

// quick approved
export async function approveNews(id) {
  const { data, error } = await supabase
    .from("News")
    .update({ status: true })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return null;
}

// deactive
export async function deactiveNews(id) {
  const { data, error } = await supabase
    .from("News")
    .update({ status: false })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return null;
}

// delete
export async function deleteNews(postID, level, userID) {
  let query = supabase.from("News").delete().eq("id", postID);

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", userID);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantDelete);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToDelete);
  }

  return null;
}

// get popular list
// fake, tbh we dont have anything on cookies or gg analytics or like
// to track user activities on a post
// so just get 5 oldest post :D
export async function getPopularList() {
  const { data, error } = await supabase
    .from("News")
    .select(`*`)
    .limit(5)
    .eq("status", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}
