import { mapURL } from "../constants/anyVariables";
import supabase from "./supabase";

// addresses
const data = {};
data.city = data.dis = data.ward = [];

export async function getAddress(city, district, ward) {
  if (!city && !district && !ward) {
    data.dis = [];
    data.ward = [];
    const { data: city, error } = await supabase
      .from("CityDirectory")
      .select("*", { count: "exact" });

    if (error) throw new Error(error.message);

    data.city = city;
  }

  if (city && !district && !ward) {
    data.ward = [];
    const { data: cityData, errorCity } = await supabase
      .from("CityDirectory")
      .select("*");

    const { data: dis, error } = await supabase
      .from("DistrictDirectory")
      .select("*", { count: "exact" })
      .eq("cityID", city);

    if (error || errorCity)
      throw new Error("there was an error while fetching");

    data.city = cityData;
    data.dis = dis;
  }

  if (city && district && !ward) {
    const { data: cityData, errorCity } = await supabase
      .from("CityDirectory")
      .select("*");
    const { data: dis, errorDis } = await supabase
      .from("DistrictDirectory")
      .select("*")
      .eq("cityID", city);
    const { data: ward, error } = await supabase
      .from("WardDirectory")
      .select("*", { count: "exact" })
      .eq("disID", district);

    if (error || errorDis || errorCity)
      throw new Error("there was an error while fetching");

    data.city = cityData;
    data.dis = dis;
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

    data.city = [address[0].dis.city.cityName];
    data.dis = [address[0].dis.disName];
    data.ward = [address[0].wardName];
  }

  return data;
}

export async function getLatLong(address) {
  const res = await fetch(
    mapURL + `?address=${address}&key=${import.meta.env.VITE_MAP_KEY}`,
  );

  const data = await res.json();
  const { location } = data.results[0].geometry;

  const lat = parseFloat(location.lat);
  const long = parseFloat(location.lng);

  return { lat, long };
}

// documents support
export async function getDocuments() {
  const { data, error } = await supabase.from("LegalDoc").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function insertDocument(docID, postID) {
  const { error } = await supabase
    .from("REDocs")
    .insert([{ docType: docID, postID }]);

  if (error) {
    throw new Error(error.message);
    // throw new Error("khong the them giay to phap ly, vui long thu lai sau");
  }

  return null;
}
