import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import { LIMIT_NEWS, INSTOCK, USER_LEVEL } from "../constants/anyVariables";
import { sanitizeSearchInput } from "../utils/helper";

// addresses
export async function getAddress(city, district, ward, edit) {
  const data = {
    city: [],
    dis: [],
    ward: [],
  };

  if (!city && !district && !ward) {
    data.city = await getCity();
  }

  if (city && !district && !ward) {
    data.city = await getCity();
    data.dis = await getDis(city);
  }

  if (city && district && !ward) {
    data.city = await getCity();
    data.dis = await getDis(city);
    data.ward = await getWard(district);
  }

  // for edit
  if (city && district && ward && edit) {
    data.city = await getCity();
    data.dis = await getDis(city);
    data.ward = await getWard(district);
  }

  return data;
}

async function getCity() {
  const { data: cityData, error } = await supabase
    .from("CityDirectory")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }

  return cityData;
}

async function getDis(cityID) {
  if (!cityID) {
    return false;
  }

  const { data: disData, error } = await supabase
    .from("DistrictDirectory")
    .select("*")
    .eq("cityID", cityID);

  if (error) {
    throw new Error(error.message);
  }

  return disData;
}

async function getWard(disID) {
  if (!disID) {
    return false;
  }

  const { data: wardData, error } = await supabase
    .from("WardDirectory")
    .select("*")
    .eq("disID", disID);

  if (error) {
    throw new Error(error.message);
  }

  return wardData;
}

// send contact at home page
export async function createContact(formData) {
  const { error } = await supabase.from("Contact").insert([{ ...formData }]);

  if (error) {
    throw new Error(error);
  }

  return null;
}

// get users list to contacts page
export async function getUsersList(page) {
  const start = (page - 1) * LIMIT_NEWS;
  const end = start + LIMIT_NEWS - 1;

  const { data, count, error } = await supabase
    .from("Profile")
    .select(
      `*, 
      city: CityDirectory (cityName),
      dis: DistrictDirectory (disName),
      ward: WardDirectory (wardName)
    `,
      { count: "exact" },
    )
    .limit(LIMIT_NEWS)
    .range(start, end)
    .eq("level", USER_LEVEL);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// user detail page
export async function getUser(id) {
  const { data, error } = await supabase
    .from("Profile")
    .select(
      `*, 
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName)
  `,
    )
    .eq("id", id)
    .eq("level", USER_LEVEL)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

export async function getUserPosts(userID, page) {
  if (!userID) {
    return;
  }
  const start = (page - 1) * LIMIT_NEWS;
  const end = start + LIMIT_NEWS - 1;

  const {
    data: posts,
    count,
    error,
  } = await supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName),
    images: REMedias(*),
    profile: Profile(id, fullName,avatar),
    type: REType(*)
  `,
      { count: "exact" },
    )
    .limit(LIMIT_NEWS)
    .eq("userID", userID)
    .eq("images.isImage", true)
    .eq("status", INSTOCK)
    .gt("expriryDate", new Date().toISOString())
    .range(start, end)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { posts, count };
}

// query users
export async function queryUsers(search, page) {
  if (search.toString().length < 3) {
    return;
  }

  const start = (page - 1) * LIMIT_NEWS;
  const end = start + LIMIT_NEWS - 1;
  const input = sanitizeSearchInput(search);

  const { data, count, error } = await supabase
    .from("Profile")
    .select(
      `*, city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName)
  `,
      { count: "exact" },
    )
    .textSearch("fullName", input)
    .limit(LIMIT_NEWS)
    .range(start, end)
    .eq("level", USER_LEVEL);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
