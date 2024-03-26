import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import {
  ADMIN_LEVEL,
  LIMIT_PER_PAGE,
  maxLength,
  minLength,
} from "../constants/anyVariables";
import { getStatusID } from "../utils/helper";

export async function getFullREList(userID, sort, filter, page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

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
      postStatus: REStatus(*),
      type: REType(name)      
    `,
      { count: "exact" },
    )
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  // sort
  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // filter
  if (filter !== "none" && filter !== "status-expired") {
    const [col, status] = filter.split("-");
    const id = getStatusID(status);
    query = query.eq(col, id);
  } else if (filter === "status-expired") {
    query = query.lt("expriryDate", new Date().toISOString());
  }

  // base level query
  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", id);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// manage single post
export async function getPost(slug, level, userID) {
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
    profile: Profile(phone,fullName,avatar),
    status: REStatus (*),
    type: REType (type)
  `,
    )
    .limit(1)
    .eq("slug", slug);

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", userID);
  }

  const { data, error } = await query.single();

  if (error) {
    console.log(error.message);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

// news
export async function getFullNewsList(userID, sort, filter, page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  // get curr User
  const { data: curUser, error: curUserError } = await supabase
    .from("Profile")
    .select(`*`)
    .limit(1)
    .eq("id", userID)
    .single();

  if (curUserError) {
    console.log(curUserError);
    throw new Error(errorMessage.fetchError);
  }

  const { level, id } = curUser;

  // get news without content & thumb
  let query = supabase
    .from("News")
    .select(
      `id, created_at, title, summary, status, slug, 
      author: Profile(fullName, avatar)`,
      { count: "exact" },
    )
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  // sort
  if (sort !== "created_at-desc") {
    const [col, order] = sort.split("-");
    query = query.order(col, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // filter
  if (filter !== "none") {
    const [col, value] = filter.split("-");
    const status = value === "waiting" ? false : true;
    query = query.eq(col, status);
  }

  if (level < ADMIN_LEVEL) {
    query = query.eq("userID", id);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// docs
export async function getFullDocsList(page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  const { data, count, error } = await supabase
    .from("LegalDoc")
    .select(`*`, { count: "exact" })
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
