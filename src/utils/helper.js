import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ADMIN_LEVEL,
  DEFAULT_RE_STATUS,
  EDITOR_LEVEL,
  SELLING_STATUS,
  SOLD_STATUS,
  USER_LEVEL,
  billion,
  m2,
  maxAreaSearch,
  million,
} from "../constants/anyVariables";
import { navLinks, prices } from "../constants/navlink";

// calc how much money per m2
export function pricePerArea(purType, price, area) {
  if (!purType) return;
  return Math.ceil(price / area);
}

// 1.000.000.000 => 1 billion
export function formatCurrency(input) {
  if (Number(input) >= billion) {
    return round2Digit(input / billion) + " tỷ";
  }
  if (Number(input) >= million) {
    return round2Digit(input / million) + " triệu";
  }
  if (Number(input) < million) {
    return Math.ceil(input / 1000) + " nghìn";
  }
}

// round the price
function round2Digit(num) {
  return parseFloat(Number(num).toFixed(2));
}

// date format
export function formatDate(date, formatString = "dd/MM/yyyy") {
  return format(new Date(date), formatString, { locale: vi });
}

// format number
export function formatNumber(input) {
  return input.toLocaleString("vi-VN");
}

// parse
export function parseCurrency(input) {
  if (typeof input === "number") {
    return input;
  }
  // Remove non-numeric characters and currency symbol
  const numericString = input.replace(/[^\d]/g, "");

  // Convert the numeric string to a number
  const numericValue = parseInt(numericString, 10);

  // Return the parsed number
  return numericValue;
}

// hidden last 3-digit of phone number
export function hiddenLast3PhoneNum(input) {
  if (!input) {
    return "Không có SĐT";
  }
  return "0" + input.toString().slice(0, 6) + "***";
}

// just show lat 4 number
export function showLast4PhoneNum(input) {
  return "+84 *****" + input.toString().slice(-4);
}

// get re status badge color base on status
export function getStatusBadgeColor(id) {
  if (!id) return "red";

  let color;
  switch (id) {
    case SELLING_STATUS:
      color = "green";
      break;
    case DEFAULT_RE_STATUS:
      color = "red";
      break;
    case SOLD_STATUS:
      color = "orange";
      break;
    default:
      break;
  }

  return color;
}

export function getStatusBadgeProfile(level) {
  let color;

  switch (level) {
    case USER_LEVEL:
      color = "blue";
      break;
    case EDITOR_LEVEL:
      color = "green";
      break;
    case ADMIN_LEVEL:
      color = "red";
      break;
    default:
      break;
  }

  return color;
}

export function getCoreNameType(name, type) {
  switch (type) {
    case "nha-mat-pho":
      return name.slice(4)[0].toUpperCase() + name.slice(5);
    case "dat-nen-du-an":
      return name.slice(4)[0].toUpperCase() + name.slice(5);
    case "dat-nen-tho-cu":
      return name.slice(4)[0].toUpperCase() + name.slice(5);
    case "cac-loai-khac":
      return name.slice(-4);
    case "kho-nha-xuong":
      return "kho xưởng";
    default:
      break;
  }

  return name.split(",")[0];
}

export const checkInputType = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0|\+84)?[0-9]{9}$/;
  if (emailRegex.test(input)) {
    return "email";
  } else if (phoneRegex.test(input)) {
    return "phone";
  } else {
    return "unknown";
  }
};

// calc min - max range slider
function getRETypeName(purType, input) {
  let result;
  if (purType) {
    result = navLinks[0].child_links
      .find((i) => i.type === input)
      .title.toLowerCase();
  } else {
    result = navLinks[1].child_links
      .find((i) => i.type === input)
      .title.toLowerCase();
  }

  return result;
}

// sanitize query input
export function sanitizeSearchInput(input = "") {
  return input.trim().split(" ").join(" & ");
}

// convert price for display query
function getPriceLabel(input) {
  return prices.find((i) => i.value === input).label.toLowerCase();
}

// convert price for api
export function convertPrice(input) {
  const [from, to] = input.split("-");
  // eg: input: "60"
  // input.split('-')
  // ['60']
  if (from === "60") {
    return { from: Number(from) * billion };
  }

  // has to mean input go in [range]

  const tag = from === "500" ? million : billion;
  if (to) {
    return { from: Number(from) * tag, to: Number(to) * billion };
  }

  return { from: Number(from) * tag };
}

export function renderQueryLabel(search, city) {
  if (!city) {
    return;
  }

  const type = getRETypeName(search.purType, search.reType);
  const area =
    search?.area === "above"
      ? ` trên ${maxAreaSearch}${m2}`
      : search?.area?.[0] !== 1 || search?.area?.[1] !== maxAreaSearch
        ? ` từ ${search?.area?.[0]} - ${search?.area?.[1]}${m2}`
        : "";
  const price =
    search?.price !== "0" ? ` giá ${getPriceLabel(search?.price)}` : "";
  const address = !isNaN(search?.cityID)
    ? ` tại ${city.find((i) => i.cityID === search.cityID)?.cityName}`
    : "";

  return "Danh sách " + type + area + price + address;
}

// get status id
export function getStatusID(value) {
  switch (value) {
    case "waiting":
      return DEFAULT_RE_STATUS;
    case "selling":
      return SELLING_STATUS;
    case "sold":
      return SOLD_STATUS;
    default:
      break;
  }
}

export function convertSex(value) {
  switch (value) {
    case true:
      return "1";
    case false:
      return "2";
    default:
      return "3";
  }
}

export function convertSexToText(id) {
  switch (id) {
    case `1`:
      return "Nam";
    case `2`:
      return "Nữ";
    default:
      return "Không xác định";
  }
}

export function getAge(input) {
  if (!input) {
    return;
  }
  const date = new Date(input).getFullYear();
  const today = new Date();
  return String(today.getFullYear() - date);
}

export function getTime(input) {
  const date = new Date(input);
  const hr = date.getHours();
  const min = date.getMinutes();
  const scd = date.getSeconds();
  console.log(hr, min, scd);

  return `${hr}:${min < 10 ? "0" + min : min}`;
}
