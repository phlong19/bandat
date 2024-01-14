const billion = 1000000000;
const million = 1000000;
export const m2 = "/m²";

export function pricePerArea(price, area) {
  return Math.ceil(price / area);
}

export function formatCurrency(input) {
  if (Number(input) > billion) {
    return Math.ceil(input / billion) + " tỷ";
  }
  if (Number(input) > million) {
    return Math.ceil(input / million) + " triệu";
  }
}