import supabase from "./supabase";
import { v4 } from "uuid";

import { LIMIT_PER_PAGE, geoCodeURL } from "../constants/anyVariables";
import { getAddress } from "./apiGeneral";

export async function getHomepage() {
  const { data, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
      city: CityDirectory (cityName),
      dis: DistrictDirectory (disName),
      images: REImages(mediaLink),
      profile: Profile(phone,fullName,avatar)
  `,
    )
    // .order(vip)
    .limit(LIMIT_PER_PAGE);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// purType true = sell | false = rent
// citeria for sort, mostly
export async function getList(type, citeria) {
  // switch case for citerias
  const { data, count, error } = await supabase
    .from("REDirectory")
    .select(
      `*,
    city: CityDirectory (cityName),
    dis: DistrictDirectory (disName),
    ward: WardDirectory (wardName),
    images: REImages(mediaLink),
    docs: REDocs(docName: LegalDoc(doc_name)),
    profile: Profile(phone,fullName,avatar)
  `,
      { count: "exact" },
    )
    // .eq("purType", type)
    // .eq("status", true)
    // for pagination
    .range(0, LIMIT_PER_PAGE - 1);
  // .order(vip)

  if (error) throw new Error(error.message);

  // every thing is object =))
  data.count = count;

  return data;
}

export async function createNewREPost(newData) {
  console.log(newData);
  const { files, docs, reType, ...reData } = newData;
  console.log(reData);
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
  const fullAddress = `${reData.address} ${ward} ${dis} ${city}`;
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

  console.log(docs);
  console.log(files);

  // handle media
  files.images.forEach((file) => uploadMedia(file, postID));

  return null;
}

async function uploadMedia(file, postID) {
  const fileName = `REDir - ${v4()}${postID}`;
  const { data: uploadedFile, error: uploadError } = await supabase.storage
    .from("medias")
    .upload(fileName, file);

  if (uploadError) {
    throw new uploadError(error.message);
  }
  console.log(uploadedFile);
  const { data, error } = await supabase
    .from("REImages")
    .insert([{ postID, mediaLink:  }])
    .select()
    .single();

  console.log(data);
  return null;
}
