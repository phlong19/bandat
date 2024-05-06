import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import { ADMIN_LEVEL } from "../constants/anyVariables";

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

export async function getPostData(userID, level) {
  let query = supabase.from("REDirectory").select(
    `id,
     purType, 
     status,
     REType_ID,
     created_at, 
     price,
     type: REType(*)
    `,
    { count: "exact" },
  );

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", userID);
  }

  const { data, count, error } = await query.order("created_at", {
    ascending: true,
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
