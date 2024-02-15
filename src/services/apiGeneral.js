import supabase from "./supabase";

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

    data.city.push(address[0].dis.city.cityName);
    data.dis.push(address[0].dis.disName);
    data.ward.push(address[0].wardName);
  }

  return data;
}

export async function getDocuments() {
  const { data, error } = await supabase.from("LegalDoc").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
