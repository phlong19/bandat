import supabase, { supabaseUrl } from "./supabase";
import { v4 } from "uuid";

export async function uploadMedia(file, postID) {
  const fileName = `REDir - ${v4()}${postID}`;
  const { data: uploadedFile, error: uploadError } = await supabase.storage
    .from("medias")
    .upload(fileName, file);

  if (uploadError) {
    throw new uploadError(error.message);
  }
  // insert into re images
  const { error } = await supabase.from("REMedias").insert([
    {
      postID,
      mediaLink: `${supabaseUrl}/storage/v1/object/public/${uploadedFile.fullPath}`,
      isImage: file.type.startsWith("image"),
    },
  ]);

  if (error) {
    throw new Error(error.message); // for dev
    // throw new Error(`khong the upload file ${file.type}: ${file.name}`);
  }

  return null;
}

// edit post => replace media by delete the old one and upsert the new one with the deleted id
// delete post => just need to delete from bucket, in REMedia table its automatically
// but still need to get all the link, path name before delete in the table, u know