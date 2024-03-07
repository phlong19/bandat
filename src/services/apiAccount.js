import supabase, { supabaseUrl } from "./supabase";
import { account } from "../constants/message";
import { v4 } from "uuid";
import { error as errorMessage } from "../constants/message";

export async function updateAddress(data) {
  const { userID, ...newAddress } = data;

  const { data: updatedAccount, error } = await supabase
    .from("Profile")
    .update({ ...newAddress })
    .eq("id", userID)
    .select();

  if (error) {
    throw new Error(account.cantUpdate);
  }

  if (updatedAccount.length < 1) {
    throw new Error(account.cantUpdate);
  }

  return null;
}

// update avatar
export async function updateAvatar(formData) {
  const { files, userID } = formData;
  const fileName = `User - ${v4()}`;

  const { data: uploadedFile, error: uploadError } = await supabase.storage
    .from("users")
    .upload(fileName, files[0]);

  if (uploadError) {
    console.log(uploadError);
    throw new Error(errorMessage.uploadFailed);
  }

  const { data, error } = await supabase
    .from("Profile")
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/${uploadedFile.fullPath}`,
    })
    .eq("id", userID)
    .select();

  if (error) {
    throw new Error(account.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(account.cantUpdate);
  }

  return null;
}

// username
// password
// email
// phone ?
