import { billion, million } from "../constants/anyVariables";

// calc how much money per m2
export function pricePerArea(price, area) {
  return Math.ceil(price / area);
}

// 1.000.000.000 => 1 billion
export function formatCurrency(input) {
  if (Number(input) > billion) {
    return Math.ceil(input / billion) + " tỷ";
  }
  if (Number(input) > million) {
    return Math.ceil(input / million) + " triệu";
  }
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
  const result = input.toLocaleString("vi-VN");

  return result;
}

// hidden last 3-digit of phone number
export function hiddenLast3PhoneNum(input) {
  return "0" + input.toString().slice(0, 6) + "***";
}
