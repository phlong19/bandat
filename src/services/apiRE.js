import supabase from "./supabase";

import {
  LIMIT_PER_PAGE,
  SELLING_STATUS,
  geoCodeURL,
  maxLength,
  minLength,
} from "../constants/anyVariables";
import { getAddress, insertDocument } from "./apiGeneral";
import { uploadMedia } from "./apiMedia";

export async function getList(type, citeria, page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  // query
  // re type
  // area
  // address

  const { data, count, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
      city: CityDirectory (cityName),
      dis: DistrictDirectory (disName),
      ward: WardDirectory (wardName),
      images: REMedias(mediaLink, isImage)!isImage.is(true),
      profile: Profile(phone,fullName,avatar)
    `,
      { count: "exact" },
    )
    .eq("purType", type)
    .eq("status", SELLING_STATUS)
    // for pagination
    .range(start, end);

  if (error) throw new Error(error.message);

  // every thing is object =))
  data.count = count;

  return data;
}

export async function checkPost(slug) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  const { data, error } = await supabase
    .from("REDirectory")
    .select("id")
    .limit(1)
    .eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPost(slug) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  const { data, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName),
    images: REMedias(mediaLink),
    docs: REDocs(docName: LegalDoc(doc_name)),
    profile: Profile(phone,fullName,avatar),
    status: REStatus (*)
  `,
    )
    .limit(1)
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createPost(newData) {
  const { files, docs, reType, ...reData } = newData;

  // get re type id, ex: nha-rieng = 1
  const { data: typeID, error } = await supabase
    .from("REType")
    .select("*")
    .eq("type", reType);

  if (error) {
    throw new Error("There was an error while fetching data");
  }

  // get full address from address and ids
  const { city, dis, ward } = await getAddress(
    reData.cityID,
    reData.disID,
    reData.wardID,
  );
  const fullAddress = `${reData.address} ${ward[0]} ${dis[0]} ${city[0]}`;
  console.log(city);
  console.log(dis);
  console.log(ward);
  console.log(fullAddress);
  const res = await fetch(
    geoCodeURL +
      `?q=${fullAddress}&api_key=${import.meta.env.VITE_GEOCODE_KEY}`,
  );
  // destructure lat & long from api results
  const geo = await res.json();
  const lat = parseFloat(geo[0].lat);
  const long = parseFloat(geo[0].lon);

  // post
  const {
    data: { id: postID },
    error: createError,
  } = await supabase
    .from("REDirectory")
    .insert([
      {
        ...reData,
        REType_ID: typeID[0].REType_ID,
        lat,
        long,
      },
    ])
    .select()
    .single();

  if (createError) {
    throw new Error(createError.message); // for dev
    // throw new Error("khong the tao bai dang luc nay, vui long thu lai sau");
  }

  // handle media
  files.images.forEach((file) => uploadMedia(file, postID));
  files.videos.forEach((file) => uploadMedia(file, postID));

  // handle docs
  docs.forEach((id) => insertDocument(id, postID));

  return null;
}

// edit
// delete
