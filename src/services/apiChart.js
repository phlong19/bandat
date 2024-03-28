import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";

export async function getProfileData() {
  const { data, count, error } = await supabase
    .from("Profile")
    .select(`id, created_at`, { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

export async function getPostData() {
  const { data, count, error } = await supabase.from("REDirectory").select(
    `id,
     REType_ID,
     created_at, 
     type: REType(*)
    `,
    { count: "exact" },
  );

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
