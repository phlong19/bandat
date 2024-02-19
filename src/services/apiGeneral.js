import { geoCodeURL } from "../constants/anyVariables";
import supabase from "./supabase";

// addresses
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

    data.city = [address[0].dis.city.cityName];
    data.dis = [address[0].dis.disName];
    data.ward = [address[0].wardName];
  }

  return data;
}

const json = {
  results: [
    {
      address_components: [
        {
          long_name: "35",
          short_name: "35",
          types: ["street_number"],
        },
        {
          long_name: "Phố Quán Thánh",
          short_name: "P. Quán Thánh",
          types: ["route"],
        },
        {
          long_name: "Ba Đình",
          short_name: "Ba Đình",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Hà Nội",
          short_name: "Hà Nội",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Vietnam",
          short_name: "VN",
          types: ["country", "political"],
        },
      ],
      formatted_address:
        "35 P. Quán Thánh, Quán Thánh, Ba Đình, Hà Nội, Vietnam",
      geometry: {
        location: {
          lat: 21.042066,
          lng: 105.8436322,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 21.0434579802915,
            lng: 105.8449945302915,
          },
          southwest: {
            lat: 21.0407600197085,
            lng: 105.8422965697085,
          },
        },
      },
      place_id: "ChIJjeihYrqrNTERlsqYDZ0zeDM",
      plus_code: {
        compound_code: "2RRV+RF Ba Đình, Hanoi, Vietnam",
        global_code: "7PH72RRV+RF",
      },
      types: ["street_address"],
    },
  ],
  status: "OK",
};

export async function getLatLong(address) {
  const res = await fetch(
    geoCodeURL + `?address=${address}&key=${import.meta.env.VITE_MAP_KEY}`,
  );
  // https://maps.googleapis.com/maps/api/geocode/json?address=139%20quang%20an%20tay%20ho%20ha%20noi&key=
  const geo = await res.json();
  console.log(geo);
  const { location } = geo.results[0].geometry;
  // const { location } = json.results[0].geometry;
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
