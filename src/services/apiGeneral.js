import supabase from "./supabase";
import { error as errorMessage } from "../constants/message";
import { questURL } from "../constants/anyVariables";

// addresses
export async function getAddress(city, district, ward, edit) {
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

  // for edit
  if (city && district && ward && edit) {
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

  return null;
}

// geocoding api
export async function getLatLong(address) {
  const res = await fetch(questURL + `&location=${address}`);

  if (!res.ok) {
    throw new Error(errorMessage.fetchError);
  }

  const data = await res.json();

  if (!data || data.results.length < 1) {
    throw new Error(errorMessage.apiGeocoding);
  }

  const { lat, lng: long } = data.results[0].locations[0].latLng;

  return { lat, long };
}

// documents support
export async function getDocuments() {
  const { data, error } = await supabase.from("LegalDoc").select("*");

  if (error) {
    console.log(error);
    throw new Error(errorMessage.fetchError);
  }
  return data;
}

export async function insertDocument(docID, postID) {
  const { error } = await supabase
    .from("REDocs")
    .insert([{ docType: docID, postID }]);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantInsertDocs);
  }

  return null;
}

export async function deleteDocument(docID) {
  const { error } = await supabase.from("REDocs").delete().eq("id", docID);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantDeleteDocs);
  }

  return null;
}
