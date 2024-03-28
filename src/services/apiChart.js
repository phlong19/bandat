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

export async function getPostData(purType, dateRange) {
  let query = supabase.from("REDirectory").select(
    `id,
     REType_ID,
     created_at, 
     type: REType(*)
    `,
    { count: "exact" },
  );

  if (purType !== null) {
    query = query.eq("purType", purType);
  }

  if (dateRange || dateRange.length < 2) {
    const start = dateRange[0].toISOString();
    const end = dateRange[1].toISOString();
    query = query.gte("created_at", start).lte("created_at", end);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
