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

function round2Digit(num) {
  return parseFloat(Number(num).toFixed(2));
}

// date format: 2024-01-15T07:16:46.580913+00:00 => 15 tháng 1, 2024
// default month is "long"
export function formatDate(dateString, monthType = "long", withTime = false) {
  const options = {
    month: monthType,
    year: "numeric",
    day: "numeric",
  };
  if (withTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  const date = new Date(dateString).toLocaleDateString("vi-VN", options);
  return date;
}

// format number
export function formatNumber(input) {
  return input.toLocaleString("vi-VN");
}

// parse
export function parseCurrency(input) {
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
