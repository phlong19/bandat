import { Json } from "../database";
import supabase, { order } from "./supabase";

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
 *
 */
export async function createOrder(formData: FormData) {
  const { data, error } = await supabase
    .from(order)
    .insert([formData])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Hiện không thể tạo đơn hàng, vui lòng thử lại sau");
  }

  return null;
}
