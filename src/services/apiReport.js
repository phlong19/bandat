import supabase from "./supabase";

import { error as errorMessage } from "../constants/message";
import { LIMIT_NEWS } from "../constants/anyVariables";

// report list, require postID
// use at manage page but bring it here 'cause that file is quite long
export async function getReportsByPost(postID, page) {
  const start = (page - 1) * LIMIT_NEWS;
  const end = start + LIMIT_NEWS - 1;

  const { data, count, error } = await supabase
    .from("Reports")
    .select(`*, profile: Profile(*)`, { count: "exact" })
    .eq("postID", postID)
    .limit(LIMIT_NEWS)
    .range(start, end);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// create report record and increase 1 at re dir table
export async function createReport(formData) {
  // get post first, then if post exist or still valid (not expire) => update, for reduce unnecessary request
  const { data: post, error: fetchErr } = await supabase
    .from("REDirectory")
    .select(`id, report`)
    .eq("id", formData.postID)
    .gt("expriryDate", new Date().toISOString())
    .limit(1)
    .single();

  if (fetchErr) {
    console.log(fetchErr);
    throw new Error(errorMessage.fetchError);
  }

  if (!post) {
    throw new Error(errorMessage.cantFindPost);
  }

  const { id, report } = post;
  const newReport = report + 1;
  console.log(newReport);

  // rc = a report record
  const { data: rc, error } = await supabase
    .from("Reports")
    .insert([{ ...formData }])
    .select()
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantCreateReport);
  }

  const { data, error: updateError } = await supabase
    .from("REDirectory")
    .update({ report: newReport })
    .eq("id", id)
    .gt("expriryDate", new Date().toISOString())
    .select(`*`);

  if (updateError || data.length < 1) {
    await supabase.from("Reports").delete().eq("id", rc.id);
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return null;
}
