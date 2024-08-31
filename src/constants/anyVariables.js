// current year
export const currentYear = new Date().getFullYear();

// max item 1 page
export const LIMIT_PER_PAGE = 20;
// max news 1 page
export const LIMIT_NEWS = 8;

// min & max files can be uploaded
const BASE_MEDIA_UPLOAD = 1;
const LIMIT_IMG_UPLOAD = 10;
const LIMIT_VID_UPLOAD = 2;
const MAX_SIZE_UPLOAD = 10485760;
const MAX_SIZE_AVATAR = 5242880;
const ratio = 2 / 1;
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
const fb = import.meta.env.VITE_FB;
const ytb = import.meta.env.VITE_YTB;
const x = import.meta.env.VITE_X;
const zalo = import.meta.env.VITE_ZALO;
const tiktok = import.meta.env.TIKTOK;
export { fb, ytb, x, zalo, tiktok };

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
const minLength = 1;
const maxLength = 500;
const minDesLength = 150;
const maxDesLength = 10000;
export { minLength, maxLength, minDesLength, maxDesLength };

// news
const minTitle = 30;
const maxTitle = 500;
const minSummary = 50;
const maxSummary = 500;
const minContent = 300;
const maxContent = 10000;
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
  "Ngày hết hạn",
];

// hardcode product status
const INSTOCK = 1; // con hang
const TEMP_OUT = 2; // tam het hang
const OUT_STOCK = 3; // het hang
const OUT = 4; // ngung nhap hang
export { INSTOCK, TEMP_OUT, OUT_STOCK, OUT };

const local = `http://localhost:3000`;
const landhub = `https://www.landhub.netlify.app`;
export { local, landhub };
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

export const profileCaptions = [
  "Tên người dùng",
  "Email",
  "Phân quyền",
  "Địa chỉ",
  "Giới tính",
  "Ngày sinh",
  "Ngày tạo",
];

// auth
const minName = 8;
const maxName = 30;

export { minName, maxName };

// expriry range
export const EXPRIRY_LENGTH = 14;
export const phoneLength = 10;
