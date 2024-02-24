import supabase from "./supabase";

import {
  ADMIN_LEVEL,
  DEFAULT_RE_STATUS,
  LIMIT_PER_PAGE,
  SELLING_STATUS,
  SOLD_STATUS,
  maxLength,
  minLength,
} from "../constants/anyVariables";
import { getFullAddress, getLatLong, insertDocument } from "./apiGeneral";
import { uploadMedia } from "./apiMedia";
import { error as errorMessage } from "../constants/message";

export async function getList(type, citeria, page) {
  // query
  // re type
  // area
  // address

  let query = supabase
    .from("REDirectory")
    .select(
      `*,
        city: CityDirectory (cityName),
        dis: DistrictDirectory (disName),
        ward: WardDirectory (wardName),
        images: REMedias(mediaLink, isImage),
        profile: Profile(fullName,avatar),
        type: REType(*)
    `,
      { count: "exact" },
    )
    .eq("purType", type)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .order("created_at", { ascending: false });
  // for pagination
  if (page) {
    const from = (page - 1) * LIMIT_PER_PAGE;
    const to = from + LIMIT_PER_PAGE - 1;
    query = query.range(from, to);
  }
  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }
  return { data, count };
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
    console.log(error);
    throw new Error(errorMessage.fetchError);
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
    medias: REMedias(id, mediaLink, isImage),
    docs: REDocs(id, docName: LegalDoc(doc_id, doc_name)),
    profile: Profile(phone,fullName,avatar),
    status: REStatus (*),
    type: REType (type)
  `,
    )
    .limit(1)
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// create
export async function createPost(newData) {
  const { files, docs, reType, ...reData } = newData;

  // get re type id, ex: nha-rieng = 1
  const { data: typeID, error } = await supabase
    .from("REType")
    .select("*")
    .eq("type", reType);

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  const fullAddress = await getFullAddress(
    reData.cityID,
    reData.disID,
    reData.wardID,
    reData.address,
  );

  const { lat, long } = await getLatLong(fullAddress);

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
    console.log(createError);
    throw new Error("khong the tao bai dang luc nay, vui long thu lai sau");
  }

  // handle media
  files.images.forEach((file) => uploadMedia(file, postID));
  files.videos.forEach((file) => uploadMedia(file, postID));

  // handle docs
  docs.forEach((id) => insertDocument(id, postID));

  return null;
}

// update
export async function updatePost(postID, newData) {
  const { files, docs, reType, ...reData } = newData;

  

  return null;
}

// approve
export async function approvePost(postID) {
  const { data, error } = await supabase
    .from("REDirectory")
    .update({ status: SELLING_STATUS })
    .eq("id", postID)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantUpdate);
  }

  return data;
}

// mark sold
export async function markSold(id) {
  const { data, error } = await supabase
    .from("REDirectory")
    .update({ status: SOLD_STATUS })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  return null;
}

// deactive
export async function deactivePost(postID) {
  const { data, error } = await supabase
    .from("REDirectory")
    .update({ status: DEFAULT_RE_STATUS })
    .eq("id", postID)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantUpdate);
  }

  return null;
}

// delete
export async function deletePost(postID, level, userID) {
  let query = supabase.from("REDirectory").delete().eq("id", postID);

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", userID);
  }
  const { data, error } = await query.select();

  if (error) {
    throw new Error(errorMessage.cantDelete);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToDelete);
  }

  return null;
}
