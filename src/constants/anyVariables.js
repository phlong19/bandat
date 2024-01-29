// current year
export const currentYear = new Date().getFullYear();

// max item 1 page
export const LIMIT_PER_PAGE = 12;

// level access
const USER_LEVEL = 1;
const EDITOR_LEVEL = 2;
const ADMIN_LEVEL = 3;

export { USER_LEVEL, EDITOR_LEVEL, ADMIN_LEVEL };

// as the name said
export const defaultAvatar =
  "https://res.cloudinary.com/ddot3p3my/image/upload/v1690302821/users/image_2023-07-25_233343045_zggymb.png";

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
const m2 = "/m²";

export { billion, million, m2 };

