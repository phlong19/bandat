import supabase from "./supabase";
import { LIMIT_PER_PAGE, geoCodeURL } from "../constants/anyVariables";

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

const data = {};
data.city = data.dis = data.ward = [];

export async function getAddress(city, district, ward) {
  if (!city && !district && !ward) {
    data.dis = data.ward = [];
    const { data: city, error } = await supabase
      .from("CityDirectory")
      .select("*", { count: "exact" });

    if (error) throw new Error(error.message);

    data.city = city;
  }

  if (city && !district && !ward) {
    data.ward = [];
    const { data: dis, error } = await supabase
      .from("DistrictDirectory")
      .select("*", { count: "exact" })
      .eq("cityID", city);

    if (error) throw new Error(error.message);

    data.dis = dis;
  }

  if (city && district && !ward) {
    const { data: ward, error } = await supabase
      .from("WardDirectory")
      .select("*", { count: "exact" })
      .eq("disID", district);

    if (error) throw new Error(error.message);

    data.ward = ward;
  }

  if (city && district && ward) {
    const { data: address, error } = await supabase
      .from("WardDirectory")
      .select(
        `*, dis: DistrictDirectory(disName, city: CityDirectory(cityName))`,
      )
      .eq("wardID", ward);
    if (error) throw new Error(error.message);

    data.city = address[0].dis.city.cityName;
    data.dis = address[0].dis.disName;
    data.ward = address[0].wardName;
  }

  return data;
}

export async function createNewREPost(reData) {
  console.log(reData);
  const { address, cityID, disID, wardID, reType, userID } = reData;
  const { data: typeID, error } = await supabase
    .from("REType")
    .select("*")
    .eq("type", reType);

  if (error) {
    throw new Error("There was an error while fetching data");
  }
  console.log(typeID);

  const { city, dis, ward } = await getAddress(cityID, disID, wardID);
  const fullAddress = `${address} ${ward} ${dis} ${city}`;

  const res = await fetch(
    geoCodeURL +
      `?q=${fullAddress}&api_key=${import.meta.env.VITE_GEOCODE_KEY}`,
  );

  const { lat, lon } = await res.json()[0];

  const { data, error: createError } = await supabase
    .from("REDirectory")
    .insert([
      {
        ...reData,
        REType_ID: typeID[0].REType_ID,
        userID,
        lat: lat,
        long: lon,
      },
    ])
    .select()
    .single();

  if (createError) {
    throw new Error(createError.message); // for dev
    // throw new Error("khong the tao bai dang luc nay, vui long thu lai sau");
  }

  // handle media

  return null;
}
