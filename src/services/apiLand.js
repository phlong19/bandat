import supabase from "./supabase";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";

export async function getHomepage() {
  const { data, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    images: REImages(mediaLink),
    type: REType(REType_Name)
  `,
    )
    // .order(vip)
    .limit(LIMIT_PER_PAGE);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// purType true = sell | false = rent
// citeria for sort, mostly
export async function getList(type, citeria) {
  const { data, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    images: REImages(mediaLink),
    type: REType(REType_Name)
  `,
    )
    .eq("purType", type);
  // order(vip)

  if (error) throw new Error(error.message);

  return data;
}
