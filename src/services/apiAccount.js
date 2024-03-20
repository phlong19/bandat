import supabase, { supabaseUrl } from "./supabase";
import { account } from "../constants/message";
import { v4 } from "uuid";
import { error as errorMessage } from "../constants/message";
import { addMonths, compareAsc, startOfToday } from "date-fns";

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
export async function updateUsername(formData) {
  const { userID, ...newUsername } = formData;

  const { data: getUser, error: getUserError } = await supabase
    .from("Profile")
    .select(`*`)
    .eq("id", userID)
    .limit(1)
    .single();

  if (getUserError) {
    console.log(getUserError);
    throw new Error(errorMessage.fetchError);
  }

  // compare 00:00 today with 00:00 allow edit date
  const result = compareAsc(
    new Date(startOfToday()),
    new Date(getUser.allowEditDate),
  );

  // rs =1 => today > allow
  if (result !== 1) {
    throw new Error(errorMessage.cantEditName);
  }

  const { data: updatedAccount, error } = await supabase
    .from("Profile")
    // new allow => 00:00 today + 1 month
    .update({ ...newUsername, allowEditDate: addMonths(startOfToday(), 1) })
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

// sex & birthday
export async function updateOthers(formData) {
  const { userID, ...newData } = formData;

  const { data: updatedAccount, error } = await supabase
    .from("Profile")
    .update({ ...newData })
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

// password
export async function updatePassword(password) {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantUpdatePass);
  }

  return null;
}

// phone
export async function updatePhone(formData) {
  const { userID, ...newData } = formData;

  const { data, error } = await supabase
    .from("Profile")
    .update({ ...newData })
    .eq("id", userID)
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

// check phone existed?
export async function checkPhone(phone) {
  const phoneNum = Number(phone.slice(1));
  const { data } = await supabase
    .from("Profile")
    .select("*")
    .limit(1)
    .eq("phone", phoneNum)
    .single();

  return data;
}
