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

export async function deleteMedia(name) {
  const { data, error } = await supabase.storage.from("medias").remove([name]);

  if (error) {
    throw new Error(error.message);
    // throw new Error("khong the xoa anh, do biet tai sao?");
  }

  // supabase wont throw error on can find the file and delete it, so we have to check the data length to cover more cases
  if (data.length < 1) {
    throw new Error("cant find any file match the name to delete");
  }

  // success data object look like:
  // [
  //   {
  //       "name": "REDir - fcc70151-d8d3-44e4-be50-143e0a33b98f20",
  //       "bucket_id": "medias",
  //       "owner": "b72b2f07-06b1-4287-90bb-924c811a80c0",
  //       "owner_id": "b72b2f07-06b1-4287-90bb-924c811a80c0",
  //       "version": "419243aa-416a-40b8-905b-2204baad3f45",
  //       "id": "26e9eb6d-4e6f-4447-977c-a3f15104717b",
  //       "updated_at": "2024-02-19T07:48:06.177Z",
  //       "created_at": "2024-02-19T07:48:06.177Z",
  //       "last_accessed_at": "2024-02-19T07:48:06.177Z",
  //       "metadata": {
  //           "eTag": "\"748c29f92e39d9e12a4c49f9c8cdb5f8\"",
  //           "size": 257785,
  //           "mimetype": "image/jpeg",
  //           "cacheControl": "max-age=3600",
  //           "lastModified": "2024-02-19T07:48:07.000Z",
  //           "contentLength": 257785,
  //           "httpStatusCode": 200
  //       }
  //   }
  // ]

  return data;
}
