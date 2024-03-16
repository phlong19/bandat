import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  DEFAULT_RE_STATUS,
  SELLING_STATUS,
  SOLD_STATUS,
  billion,
  million,
} from "../constants/anyVariables";

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
  if (Number(input) > million) {
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

export function getCoreNameType(name, type) {
  switch (type) {
    case "nha-mat-pho":
      return name.slice(4);
    case "dat-nen-du-an":
      return name.slice(4);
    case "dat-nen-tho-cu":
      return name.slice(4);
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
