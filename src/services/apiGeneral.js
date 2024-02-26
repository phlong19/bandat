import { error as errorMessage } from "../constants/message";
import { mapURL } from "../constants/anyVariables";
import supabase from "./supabase";

// addresses

export async function getAddress(city, district, ward) {
  const data = {
    city: [],
    dis: [],
    ward: [],
  };

  if (!city && !district && !ward) {
    data.city = await getCity();
  }

  if (city && !district && !ward) {
    data.city = await getCity();
    data.dis = await getDis(city);
  }

  if (city && district && !ward) {
    data.city = await getCity();
    data.dis = await getDis(city);
    data.ward = await getWard(district);
  }

  return data;
}

async function getCity() {
  const { data: cityData, error } = await supabase
    .from("CityDirectory")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }

  return cityData;
}

async function getDis(cityID) {
  if (!cityID) {
    return false;
  }

  const { data: disData, error } = await supabase
    .from("DistrictDirectory")
    .select("*")
    .eq("cityID", cityID);

  if (error) {
    throw new Error(error.message);
  }

  return disData;
}

async function getWard(disID) {
  if (!disID) {
    return false;
  }

  const { data: wardData, error } = await supabase
    .from("WardDirectory")
    .select("*")
    .eq("disID", disID);

  if (error) {
    throw new Error(error.message);
  }

  return wardData;
}

export async function getFullAddress(cityID, disID, wardID, address) {
  if (cityID && disID && wardID) {
    const { data, error } = await supabase
      .from("WardDirectory")
      .select(
        `*, dis: DistrictDirectory(disName, city: CityDirectory(cityName))`,
      )
      .eq("wardID", wardID);
    if (error) throw new Error(error.message);

    const city = data[0].dis.city.cityName;
    const dis = data[0].dis.disName;
    const ward = data[0].wardName;

    const fullAddress = `${address} ${ward} ${dis} ${city}`;

    return fullAddress;
  }
}

// google api
export async function getLatLong(address) {
  const res = await fetch(
    mapURL + `?address=${address}&key=${import.meta.env.VITE_MAP_KEY}`,
  );

  const data = await res.json();

  if (data.results.length < 1) {
    throw new Error(errorMessage.apiGG);
  }

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
