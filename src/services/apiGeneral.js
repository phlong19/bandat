import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import {
  LIMIT_NEWS,
  questURL,
  SELLING_STATUS,
  USER_LEVEL,
} from "../constants/anyVariables";
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

export async function getFullAddress(cityID, disID, wardID, address) {
  if (cityID && disID && wardID) {
    const { data, error } = await supabase
      .from("WardDirectory")
      .select(
        `*, dis: DistrictDirectory(disName, city: CityDirectory(cityName))`,
      )
      .eq("wardID", wardID);
    if (error) throw new Error(error.message);

    const city = data[0].dis.city.cityName;
    const dis = data[0].dis.disName;
    const ward = data[0].wardName;

    const fullAddress = `${address} ${ward} ${dis} ${city}`;

    return fullAddress;
  }

  return null;
}

// geocoding api
export async function getLatLong(address) {
  const res = await fetch(questURL + `&location=${address}`);

  if (!res.ok) {
    throw new Error(errorMessage.fetchError);
  }

  const data = await res.json();

  if (!data || data.results.length < 1) {
    throw new Error(errorMessage.apiGeocoding);
  }

  const { lat, lng: long } = data.results[0].locations[0].latLng;

  return { lat, long };
}

// documents support
export async function getDocuments() {
  const { data, error } = await supabase.from("LegalDoc").select("*");

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }
  return data;
}

export async function insertDocument(docID, postID) {
  const { error } = await supabase
    .from("REDocs")
    .insert([{ docType: docID, postID }]);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantInsertDocs);
  }

  return null;
}

export async function deleteDocument(docID) {
  const { error } = await supabase.from("REDocs").delete().eq("id", docID);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantDeleteDocs);
  }

  return null;
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
    .eq("status", SELLING_STATUS)
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
