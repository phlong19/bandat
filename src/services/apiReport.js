import supabase from "./supabase";

import { error as errorMessage } from "../constants/message";
import { LIMIT_NEWS } from "../constants/anyVariables";

// report list, require postID
// use at manage page but bring it here 'cause that file is quite long
export async function getReportsByPost(postID, page) {
  const start = (page - 1) * LIMIT_NEWS;
  const end = start + LIMIT_NEWS - 1;

  const { data, error } = await supabase
    .from("Reports")
    .select(`*, profile: Profile(*)`, { count: "exact" })
    .limit(LIMIT_NEWS)
    .range(start, end);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// create report record and increase 1 at re dir table
export async function createReport(formData) {
  const { data, error } = await supabase
    .from("Reports")
    .insert([{ ...formData }]);
}
