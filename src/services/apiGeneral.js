import supabase from "./supabase";

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

// send contact at home page
export async function createContact(formData) {
  const { error } = await supabase.from("Contact").insert([{ ...formData }]);

  if (error) {
    throw new Error(error);
  }

  return null;
}
