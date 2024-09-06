import supabase, { order, profile } from "./supabase";
import { error as errorMessage } from "../constants/message";

export async function getProfileData() {
  const { data, count, error } = await supabase
    .from(profile)
    .select(`id, created_at`, { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

export async function getComposedOrderData() {
  let query = supabase
    .from(order)
    .select(`id, created_at, total, status(*)`, { count: "exact" });

  const { data, error, count } = await query.order("created_at", {
    ascending: true,
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
