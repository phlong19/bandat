import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ADMIN_LEVEL,
  EDITOR_LEVEL,
  INSTOCK,
  OUT_STOCK,
  USER_LEVEL,
  billion,
  million,
  TEMP_OUT,
  OUT,
} from "../constants/anyVariables";

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

/**
 * format currency without vietnamese text
 */
export function formatCurrencyWOText(price) {
  if (price < 0) {
    return;
  }

  const formatPrice = Number(price);

  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(formatPrice);
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

// get re status badge color base on status
export function getStatusBadgeColor(id) {
  if (!id) return "green";

  let color;
  switch (id) {
    case INSTOCK:
      color = "green";
      break;
    case OUT_STOCK:
      color = "red";
      break;
    case TEMP_OUT:
      color = "orange";
      break;
    case OUT:
      color = "gray";
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

// sanitize query input
export function sanitizeSearchInput(input = "") {
  return input.trim().split(" ").join(" & ");
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

// get status id
export function getStatusID(value) {
  switch (value) {
    case "instock":
      return INSTOCK;
    case "temp":
      return TEMP_OUT;
    case "out":
      return OUT_STOCK;
    case "preout":
      return OUT;
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
