import supabase, { product_image, supabaseUrl } from "./supabase";
import { v4 } from "uuid";
import { error as errorMessage } from "../constants/message";

export async function uploadMedia(file, productID) {
  const fileName = `Product - ${v4()}${productID}`;
  const isImage = file.type.startsWith("image");

  const { data: uploadedFile, error: uploadError } = await supabase.storage
    .from("medias")
    .upload(fileName, file);

  if (uploadError) {
    throw new uploadError(error.message);
  }
  // insert into re images
  const { error } = await supabase.from(product_image).insert([
    {
      productID,
      mediaLink: `${supabaseUrl}/storage/v1/object/public/${uploadedFile.fullPath}`,
      isImage,
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error(
      `Xảy ra lỗi khi upload ${isImage ? "ảnh" : "video"}: ${file.name}`,
    );
  }

  return null;
}

export async function deleteMedia(file) {
  const fileName = file.mediaLink.split("/").pop();
  // remove in junc table re medias if update post
  try {
    const { error } = await supabase
      .from(product_image)
      .delete()
      .eq("id", file.id);

    if (error) {
      throw new Error(errorMessage.cantDeleteMedia);
    }
  } catch (error) {
    throw new Error(error);
  }

  // remove multiples in bucket
  const { data, error } = await supabase.storage
    .from("medias")
    .remove([fileName]);

  console.error(error);
  console.log("deleted: " + data[0].name);

  return null;
}
