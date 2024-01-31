import supabase from "./supabase";
import { LIMIT_PER_PAGE } from "../constants/anyVariables";

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
