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

export async function getList(type, citeria, sort, page) {
  const from = (page - 1) * LIMIT_PER_PAGE;
  const to = from + LIMIT_PER_PAGE - 1;

  let typeID;
  if (citeria) {
    const { data, error } = await supabase
      .from("REType")
      .select(`*`)
      .eq("type", citeria)
      .limit(1)
      .single();
    if (error) {
      console.log(error);
      throw new Error(errorMessage.fetchError);
    }

    typeID = data.REType_ID;
  }

  let query = supabase
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
    .eq("purType", type)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString())
    .limit(LIMIT_PER_PAGE)
    .range(from, to);

  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // type params
  if (typeID) {
    query = query.eq("REType_ID", typeID);
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
    profile: Profile(id, phone,fullName,avatar,email),
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
  let { lat, long } = reData;

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

  if (!lat && !long) {
    const pos = await getLatLong(fullAddress);
    lat = pos.lat;
    long = pos.long;
  }

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

  let { lat, long } = reData;

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

  if (!lat && !long) {
    const pos = await getLatLong(fullAddress);
    lat = pos.lat;
    long = pos.long;
  }

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

// get related post based on address
// limit at 6
export async function getRelatedPosts(address) {
  const { cityID, disID, wardID, postID } = address;

  const select = `*,
      city: CityDirectory (cityName),
      dis: DistrictDirectory (disName),
      ward: WardDirectory (wardName),
      images: REMedias(*),
      profile: Profile(id, fullName,avatar),
      type: REType(*)
  `;

  // full address
  const { data, error } = await supabase
    .from("REDirectory")
    .select(select)
    .limit(6)
    .neq("id", postID)
    .eq("cityID", cityID)
    .eq("disID", disID)
    .eq("wardID", wardID)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString());

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  if (data.length > 0) {
    return data;
  }

  // remove wardID
  const { data: list, error: error2 } = await supabase
    .from("REDirectory")
    .select(select)
    .limit(6)
    .neq("id", postID)
    .eq("cityID", cityID)
    .eq("disID", disID)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString());

  if (error2) {
    console.log(error2);
    throw new Error(errorMessage.fetchError);
  }

  if (list.length > 0) {
    return list;
  }

  // only cityID
  const { data: list2, error: error3 } = await supabase
    .from("REDirectory")
    .select(select)
    .limit(6)
    .neq("id", postID)
    .eq("cityID", cityID)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString());

  if (error3) {
    console.log(error3);
    throw new Error(errorMessage.fetchError);
  }

  return list2;
}

// get some from the same author
export async function getRelatedPostsAuthor(currentPostID, authorID) {
  const { data, error } = await supabase
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
    )
    .limit(6)
    .eq("userID", authorID)
    .neq("id", currentPostID)
    .eq("images.isImage", true)
    .eq("status", SELLING_STATUS)
    .gt("expriryDate", new Date().toISOString());

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// get bookmarked posts
export async function getBookmarkedPosts(ids, limit = false, page) {
  let query = supabase
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
    .in("id", ids)
    .gt("expriryDate", new Date().toISOString())
    .eq("images.isImage", true);

  if (limit) {
    query = query.limit(5);
  }

  // pagination
  if (!limit) {
    const start = (page - 1) * LIMIT_PER_PAGE;
    const end = start + LIMIT_PER_PAGE - 1;
    query = query.limit(LIMIT_PER_PAGE).range(start, end);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
