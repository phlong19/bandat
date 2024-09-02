import { createClient } from "@supabase/supabase-js";
import { Database } from "../database";

export const supabaseUrl = "https://ndxokfztryzlqwcbpnpo.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;

// tables name
const order = "order";
const product = "product";
const category = "category";
const product_image = "product_image";
const news = "News";
const city = "CityDirectory";
const dis = "DistrictDirectory";
const ward = "WardDirectory";
const statusTable = "status";
const profile = "Profile";

export {
  order,
  product,
  product_image,
  profile,
  category,
  news,
  city,
  dis,
  ward,
  statusTable,
};
