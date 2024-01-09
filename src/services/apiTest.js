import supabase from "./supabase";

export async function test() {
  const { data, error } = await supabase
    .from("CityDirectory")
    .select("cityName");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
