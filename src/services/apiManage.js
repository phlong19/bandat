import { ADMIN_LEVEL, LIMIT_PER_PAGE } from "../constants/anyVariables";
import supabase from "./supabase";

export async function getFullREList(userID, page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE;

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

  let query = supabase
    .from("REDirectory")
    .select(
      `*, 
      city: CityDirectory(cityName),
      dis: DistrictDirectory(disName), 
      ward: WardDirectory(wardName),
      profile: Profile(*),
      postStatus: REStatus(*)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
