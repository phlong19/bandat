// current year
export const currentYear = new Date().getFullYear();

// max item 1 page
export const LIMIT_PER_PAGE = 12;
// min & max files can be uploaded
const BASE_MEDIA_UPLOAD = 4;
const LIMIT_IMG_UPLOAD = 8;
const LIMIT_VID_UPLOAD = 2;
const MAX_SIZE_UPLOAD = 5242880;
const MAX_SIZE_AVATAR = 3145728;
const ratio = 16 / 9;
export {
  BASE_MEDIA_UPLOAD,
  LIMIT_IMG_UPLOAD,
  LIMIT_VID_UPLOAD,
  MAX_SIZE_UPLOAD,
  MAX_SIZE_AVATAR,
  ratio,
};

// level access
const USER_LEVEL = 1;
const EDITOR_LEVEL = 2;
const ADMIN_LEVEL = 3;

export { USER_LEVEL, EDITOR_LEVEL, ADMIN_LEVEL };

// social media links
const fb = "";
const ins = "";
const x = "";
const git = "https://github.com/phlong19/bandat/";
export { fb, ins, x, git };

// purType page title
const purTypeTrue = `Mua Bán Nhà Đất Việt Nam Giá Rẻ, Mới Nhất ${currentYear}`;
const purTypeFalse = `Cho Thuê Nhà Đất Toàn Việt Nam Giá Rẻ, Chính Chủ ${currentYear}`;

export { purTypeTrue, purTypeFalse };

// number & helper
const billion = 1000000000;
const million = 1000000;
const m2 = "m²";

export { billion, million, m2 };

// title & des length
const minLength = 40;
const maxLength = 130;
const minDesLength = 150;
const maxDesLength = 2000;
export { minLength, maxLength, minDesLength, maxDesLength };

// news
const minTitle = 30;
const maxTitle = 150;
const minSummary = 150;
const maxSummary = 250;
const minContent = 300;
const maxContent = 3000;
export { minTitle, maxTitle, minSummary, maxSummary, minContent, maxContent };

// table captions
export const reCaptions = [
  "Người đăng",
  "Dạng bán",
  "Loại hình",
  "Tiêu đề",
  "Địa chỉ",
  "Báo xấu",
  "Trạng thái",
  "Ngày đăng",
];

// hardcode re status
const DEFAULT_RE_STATUS = 1;
const SELLING_STATUS = 2;
const SOLD_STATUS = 3;
export { DEFAULT_RE_STATUS, SELLING_STATUS, SOLD_STATUS };

export const questURL = `https://www.mapquestapi.com/geocoding/v1/address?key=${
  import.meta.env.VITE_QUEST_KEY
}`;

export const newsCaptions = [
  "Người đăng",
  "Trạng thái",
  "Tiêu đề",
  "Tóm tắt",
  "Ngày đăng",
];

export const maxAreaSearch = 300;
