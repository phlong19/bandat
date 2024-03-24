import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import {
  LIMIT_PER_PAGE,
  maxAreaSearch,
  SELLING_STATUS,
} from "../constants/anyVariables";
import { sanitizeSearchInput } from "../utils/helper";

export async function queryList(formData) {
  console.log(formData);
  const { purType, page, reType, area, price, query } = formData;

  const from = (page - 1) * LIMIT_PER_PAGE;
  const to = from + LIMIT_PER_PAGE - 1;

  // get typeID
  let typeID;
  if (reType) {
    const { data, error } = await supabase
      .from("REType")
      .select(`*`)
      .eq("type", reType)
      .limit(1)
      .single();
    if (error) {
      console.log(error);
      throw new Error(errorMessage.fetchError);
    }

    typeID = data.REType_ID;
  }

  let supabaseQuery = supabase
    .from("REDirectory")
    .select(
      `*,
        city: CityDirectory (cityName),
        dis: DistrictDirectory (disName),
        ward: WardDirectory (wardName),
        images: REMedias(*),
        profile: Profile(fullName,avatar),
        type: REType(*)
    `,
      { count: "exact" },
    )
    .eq("purType", purType)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString())
    .order("created_at", { ascending: false })
    .textSearch("name", query)
    .limit(LIMIT_PER_PAGE)
    .range(from, to);

  if (typeID) {
    supabaseQuery = supabaseQuery.eq("REType_ID", typeID);
  }
  // search input
  if (query) {
    supabaseQuery = supabaseQuery.textSearch(
      "name",
      sanitizeSearchInput(query),
    );
  }

  // area
  if (area === "above") {
    supabaseQuery = supabaseQuery.gte("area", maxAreaSearch);
  } else {
    supabaseQuery = supabaseQuery.gte("area", area[0]).lte("area", area[1]);
  }

  // convert price
  // TODO

  const { data, count, error } = await supabaseQuery;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
