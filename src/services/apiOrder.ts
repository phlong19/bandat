import { Json } from "../database";
import supabase, { order, profile } from "./supabase";

import { error as errMessage } from "../constants/message";
import {
  ADMIN_LEVEL,
  CANCEL,
  COMPLETED,
  LIMIT_PER_PAGE,
  WAITING,
} from "../constants/anyVariables";
import { sanitizeSearchInput } from "../utils/helper";

export interface FormData {
  address: string;
  email?: string;
  name: string;
  note?: string;
  phone: string;
  cityID: number;
  disID: number;
  wardID: number;
  details: Json;
  total: number;
}

/**
 * create order from check out page
 */
export async function createOrder(formData: FormData) {
  const { data, error } = await supabase
    .from(order)
    .insert([formData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Hiện không thể tạo đơn hàng, vui lòng thử lại sau");
  }

  return data;
}

// TODO: add a thank you page after checkout
// test the purchase flow

//#region manage section

interface FullListParams {
  userID: string;
  page: number;
  sort: string;
  filter: string;
  textQuery: string;
}

/**
 * get the full order list for table
 */
export async function getFullOrderList({
  userID,
  page,
  sort,
  filter,
  textQuery,
}: FullListParams) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  const { data: currentUser, error: getUserError } = await supabase
    .from(profile)
    .select(`id, level`)
    .eq("id", userID)
    .limit(1)
    .single();

  if (getUserError) {
    console.log(getUserError);
    throw new Error(errMessage.fetchError);
  }

  const { level } = currentUser;

  if (!level || Number(level) < ADMIN_LEVEL) {
    throw new Error(errMessage.notAuthor);
  }

  let query = supabase
    .from(order)
    .select(`*, city: CityDirectory(*)`, { count: "exact" })
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  // sort
  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // filter
  if (filter !== "none") {
    const [col, status] = filter.split("-");
    const id = getStatusID(status)!;
    query = query.eq(col, id);
  }

  // text query
  if (textQuery !== "" && textQuery?.length > 2) {
    query = query.textSearch("name", sanitizeSearchInput(textQuery));
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(errMessage.fetchError);
  }

  return { data, count };
}

// quick actions: update status and delete
export async function updateOrderStatus(params: {
  statusID: number;
  orderID: number;
}) {
  const { orderID, statusID } = params;

  const { data, error } = await supabase
    .from(order)
    .update({ status: statusID })
    .eq("id", orderID)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errMessage.cantFindToUpdate);
  }

  return data;
}

export async function deleteOrder({ orderID }: { orderID: number }) {
  const { data, error } = await supabase
    .from(order)
    .delete()
    .eq("id", orderID)
    .select();

  if (error) {
    console.log(error);
    throw new Error(errMessage.cantDelete);
  }

  if (data.length < 1) {
    throw new Error(errMessage.cantFindToDelete);
  }

  return null;
}

//#endregion

function getStatusID(status: string) {
  switch (status) {
    case "waiting":
      return WAITING;
    case "completed":
      return COMPLETED;
    case "cancel":
      return CANCEL;
  }
}
