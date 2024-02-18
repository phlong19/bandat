import { EDITOR_LEVEL } from "../constants/anyVariables";
import supabase from "./supabase";

export async function getREList(userID) {
  const { data: profile, error: getProfileError } = await supabase
    .from("Profile")
    .select("id, level")
    .limit(1)
    .eq("id", userID)
    .single();

  if (getProfileError) {
    throw new Error(getProfileError.message);
  }

  const { id, level } = profile;

  let query = supabase.from("REDirectory").select(
    `*, 
    city: CityDirectory(cityName),
      dis: DistrictDirectory(disName), 
      ward: WardDirectory(wardName),
      profile: Profile(phone, fullName, avatar)`,
  );

  if (level <= EDITOR_LEVEL) {
    query = query.eq("userID", id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
