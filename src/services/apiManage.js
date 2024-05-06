import supabase from "./supabase";
import { account, error as errorMessage } from "../constants/message";
import {
  ADMIN_LEVEL,
  LIMIT_PER_PAGE,
  maxLength,
  minLength,
} from "../constants/anyVariables";
import { getStatusID, sanitizeSearchInput } from "../utils/helper";

export async function getFullREList(userID, sort, filter, textQuery, page) {
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
      `id, REType_ID, address, created_at, expriryDate, name, status, userID, report, purType, slug, area, price,  
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

  // text query
  if (textQuery !== "" && textQuery?.length > 2) {
    query = query.textSearch("name", sanitizeSearchInput(textQuery));
  }

  // base level
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
    profile: Profile(id, phone,fullName,avatar),
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
export async function getFullNewsList(userID, sort, filter, textQuery, page) {
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

  // text query
  if (textQuery !== "" && textQuery?.length > 2) {
    query = query.textSearch("title", sanitizeSearchInput(textQuery));
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

// re type
export async function getFullTypeList(page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  const { data, count, error } = await supabase
    .from("REType")
    .select(`REType_ID, created_at, name`, { count: "exact" })
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// get profiles
export async function getFullUserList(textQuery, option, page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  let query = supabase
    .from("Profile")
    .select(
      `*, 
      city: CityDirectory (cityName),
      dis: DistrictDirectory (disName),
      ward: WardDirectory (wardName)
    `,
      { count: "exact" },
    )
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  // text query
  if (textQuery !== "" && textQuery?.length > 2) {
    const input = sanitizeSearchInput(textQuery);
    query =
      option === "fullName"
        ? query.textSearch(option, input)
        : query.ilike(option, `%${input}%`);
  }

  const { data, count, error } = await query;
  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}

// get all user data to update level
export async function getUsers() {
  const { data, error } = await supabase
    .from("Profile")
    .select(`id, fullName, level`);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return data;
}

export async function updateUserRole(userID, level) {
  if (!userID || !level) {
    return false;
  }

  const { data, error } = await supabase
    .from("Profile")
    .update({ level })
    .eq("id", userID)
    .select(`*`)
    .single();

  if (error) {
    console.log(error);
    throw new Error(account.cantUpdate);
  }

  if (!data?.id) {
    throw new Error("Không thể tìm thấy người dùng để cập nhật");
  }

  return data;
}

// get contacts
export async function getContactLists(page) {
  const start = (page - 1) * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE - 1;

  let query = supabase
    .from("Contact")
    .select(`*, profile: Profile(*)`, { count: "exact" })
    .limit(LIMIT_PER_PAGE)
    .range(start, end);

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }

  return { data, count };
}
