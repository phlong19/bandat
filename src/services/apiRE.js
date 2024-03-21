import supabase from "./supabase";
import {
  ADMIN_LEVEL,
  DEFAULT_RE_STATUS,
  EXPRIRY_LENGTH,
  LIMIT_PER_PAGE,
  SELLING_STATUS,
  SOLD_STATUS,
  maxLength,
  minLength,
} from "../constants/anyVariables";
import {
  deleteDocument,
  getFullAddress,
  getLatLong,
  insertDocument,
} from "./apiGeneral";
import { deleteMedia, uploadMedia } from "./apiMedia";
import { error as errorMessage } from "../constants/message";
import { addDays } from "date-fns";

export async function getList(type, citeria, page) {
  const from = (page - 1) * LIMIT_PER_PAGE;
  const to = from + LIMIT_PER_PAGE - 1;
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
        images: REMedias(*),
        profile: Profile(fullName,avatar),
        type: REType(*)
    `,
      { count: "exact" },
    )
    .eq("purType", type)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(LIMIT_PER_PAGE)
    .range(from, to);

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

export async function getSinglePost(slug) {
  if (!slug || slug < minLength || slug > maxLength) {
    return null;
  }

  let query = supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName),
    medias: REMedias(*),
    docs: REDocs(id, docName: LegalDoc(doc_id, doc_name)),
    profile: Profile(phone,fullName,avatar,email),
    type: REType (type, name)
  `,
    )
    .limit(1)
    .eq("slug", slug)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString());

  const { data, error } = await query.single();

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// create
export async function createPost(newData) {
  const { files, docs, reType, files360, ...reData } = newData;

  // get re type id, ex: nha-rieng = 1
  const { data: REType, error } = await supabase
    .from("REType")
    .select("*")
    .eq("type", reType)
    .single();

  if (error) {
    throw new Error(errorMessage.fetchError);
  }

  const { REType_ID: typeID } = REType;

  const fullAddress = await getFullAddress(
    reData.cityID,
    reData.disID,
    reData.wardID,
    reData.address,
  );

  const { lat, long } = await getLatLong(fullAddress);

  // post
  const { data, error: createError } = await supabase
    .from("REDirectory")
    .insert([
      {
        ...reData,
        REType_ID: typeID,
        lat,
        long,
      },
    ])
    .select()
    .single();

  if (createError) {
    console.log(createError);
    throw new Error(errorMessage.cantCreate);
  }

  const { id: postID } = data;

  // handle media
  files.images.forEach((file) => uploadMedia(file, postID));
  files.videos.forEach((file) => uploadMedia(file, postID));
  files360.forEach((file) => uploadMedia(file, postID, true));

  // handle docs
  docs.forEach(async (id) => await insertDocument(id, postID));

  return null;
}

// update
export async function updatePost(newData) {
  const {
    level,
    userID,
    authorID,
    postID,
    newDocs,
    deleteDocs,
    deleteMedias,
    newMedias,
    reType,
    files360,
    oldFiles360,
    files: _, // unused
    ...reData
  } = newData;

  // check authorization
  // if not admin AND not author => cook
  if (level < ADMIN_LEVEL && userID !== authorID) {
    throw new Error(errorMessage.notAuthor);
  }

  const { data: typeID, error: typeIDError } = await supabase
    .from("REType")
    .select("*")
    .eq("type", reType)
    .single();

  if (typeIDError) {
    console.log(typeIDError);
    throw new Error(errorMessage.fetchError);
  }

  // update address and lat long no it change or not
  const fullAddress = await getFullAddress(
    reData.cityID,
    reData.disID,
    reData.wardID,
    reData.address,
  );
  const { lat, long } = await getLatLong(fullAddress);

  // update post
  const { data, error } = await supabase
    .from("REDirectory")
    .update({
      ...reData,
      userID: authorID,
      REType_ID: typeID.REType_ID,
      lat,
      long,
    })
    .eq("id", postID)
    .select();

  if (error) {
    throw new Error(errorMessage.cantUpdate);
  }

  if (data.length < 1) {
    throw new Error(errorMessage.cantFindToUpdate);
  }

  // handle new medias
  newMedias.images.forEach(async (file) => await uploadMedia(file, postID));
  newMedias.videos.forEach(async (file) => await uploadMedia(file, postID));

  // handle delete old medias
  if (deleteMedias.length > 0) {
    deleteMedias.forEach(
      async (file) =>
        await deleteMedia(file).then(() =>
          console.log("Delete media successfully"),
        ),
    );
  }

  // has id => new image
  if (files360[0]?.id && files360[0].isNew) {
    // delete old
    await deleteMedia(oldFiles360[0]).then(() =>
      console.log("removed old 360 image"),
    );

    const { error } = await supabase
      .from("REMedias")
      .delete()
      .eq("id", oldFiles360[0].id);

    if (error) {
      throw new Error(errorMessage.cantDeleteMedia);
    }

    // upload new
    files360.forEach((file) => uploadMedia(file, postID, true));
  }

  // handle new docs
  deleteDocs.forEach(async (doc) => await deleteDocument(doc.id));
  newDocs.forEach(async (id) => await insertDocument(id, postID));

  return null;
}

// approve
export async function approvePost(postID) {
  const { data, error } = await supabase
    .from("REDirectory")
    .update({
      status: SELLING_STATUS,
      expriryDate: addDays(new Date(), EXPRIRY_LENGTH),
    })
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
