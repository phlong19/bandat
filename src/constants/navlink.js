import { ADMIN_LEVEL, EDITOR_LEVEL, USER_LEVEL } from "./anyVariables";

export const navLinks = [
  {
    title: "Nhà đất bán",
    to: "nha-dat-ban",
    child_links: [
      { title: "Bán đất nền thổ cư", type: "dat-nen-tho-cu" },
      { title: "Bán nhà riêng", type: "nha-rieng" },
      { title: "Bán căn hộ chung cư", type: "can-ho-chung-cu" },
      { title: "Bán nhà biệt thự, liền kề", type: "biet-thu-lien-ke" },
      { title: "Bán nhà mặt phố", type: "nha-mat-pho" },

      {
        title: "Bán shophouse, nhà phố thương mại",
        type: "shophouse-nha-pho-thuong-mai",
      },
      { title: "Bán đất nền dự án", type: "dat-nen-du-an" },
      {
        title: "Bán trang trại, khu nghỉ dưỡng",
        type: "trang-trai-khu-nghi-duong",
      },
      { title: "Bán condotel", type: "condotel" },
      { title: "Bán kho, nhà xưởng", type: "kho-nha-xuong" },
      { title: "Bán loại bất động sản khác", type: "cac-loai-khac" },
    ],
  },
  {
    title: "Nhà đất cho thuê",
    to: "nha-dat-cho-thue",
    child_links: [
      { title: "Cho thuê đất nền thổ cư", type: "dat-nen-tho-cu" },
      { title: "Cho thuê nhà riêng", type: "nha-rieng" },
      { title: "Cho thuê căn hộ chung cư", type: "can-ho-chung-cu" },
      { title: "Cho thuê nhà biệt thự, liền kề", type: "biet-thu-lien-ke" },
      { title: "Cho thuê nhà mặt phố", type: "nha-mat-pho" },
      {
        title: "Cho thuê shophouse, nhà phố thương mại",
        type: "shophouse-nha-pho-thuong-mai",
      },
      { title: "Cho thuê nhà trọ, phòng trọ", type: "nha-tro-phong-tro" },
      {
        title: "Cho thuê văn phòng",
        type: "van-phong",
      },
      {
        title: "Cho thuê, sang nhượng cửa hàng, ki ốt",
        type: "cua-hang-ki-ot",
      },
      { title: "Cho thuê kho, nhà xưởng", type: "kho-nha-xuong" },
      { title: "Cho thuê loại bất động sản khác", type: "cac-loai-khac" },
    ],
  },
];

export const mobileNavLinks = {
  base: [
    { title: "Đăng tin", icon: "PenToSquare", to: "dang-tin" },
    { title: "Quản lý bài viết", icon: "ListUl", to: "quan-ly-bai-viet" },
    { title: "Tin đăng đã lưu", icon: "Heart", to: "tin-da-luu" },
    { title: "Trang chủ", icon: "House", to: "/" },
    { title: "Nhà đất bán", icon: "HouseFlag", to: "nha-dat-ban" },
    { title: "Nhà đất cho thuê", icon: "BuildingFlag", to: "nha-dat-cho-thue" },
    { title: "Tin tức", icon: "Newspaper", to: "tin-tuc" },
    { title: "Danh bạ", icon: "Headset", to: "danh-ba" },
  ],
  authen: [
    {
      access: USER_LEVEL,
      title: "Quản lý tài khoản",
      icon: "CircleUser",
      to: "tai-khoan",
    },
    {
      access: EDITOR_LEVEL,
      title: "Quản lý tin tức",
      icon: "SquarePollHorizontal",
      to: "quan-ly-tin-tuc",
    },
    {
      access: ADMIN_LEVEL,
      title: "Admin Panel",
      icon: "BookBible",
      to: "control",
    },
    {
      access: ADMIN_LEVEL,
      title: "Phân quyền",
      icon: "CodeBranch",
      to: "role-management",
    },
  ],
};

export const directions = [
  "Bắc",
  "Đông Bắc",
  "Đông",
  "Đông Nam",
  "Nam",
  "Tây Nam",
  "Tây",
  "Tây Bắc",
];

export const prices = [
  { label: "Tất cả khoảng giá", value: "0" },
  { label: "Dưới 500 triệu", value: "500" },
  { label: "500 - 1 tỷ", value: "500-1" },
  { label: "1 - 5 tỷ", value: "1-5" },
  { label: "5 - 10 tỷ", value: "5-10" },
  { label: "10 - 30 tỷ", value: "10-30" },
  { label: "30 - 60 tỷ", value: "30-60" },
  { label: "Trên 60 tỷ", value: "60" },
];

// re
export const sortList = [
  { label: "Ngày đăng mới nhất", value: "created_at-desc" },
  { label: "Ngày đăng cũ nhất", value: "created_at-asc" },
  { label: "Giá giảm dần", value: "price-desc" },
  { label: "Giá tăng dần", value: "price-asc" },
  { label: "Diện tích giảm dần", value: "area-desc" },
  { label: "Diện tích tăng dần", value: "area-asc" },
];

export const filterList = [
  { label: "Chờ duyệt", value: "status-waiting" },
  { label: "Đã duyệt", value: "status-selling" },
  { label: "Đã bán", value: "status-sold" },
  { label: "Đã hết hạn", value: "status-expired" },
];

// news
export const sortNewsList = [
  { label: "Ngày đăng mới nhất", value: "created_at-desc" },
  { label: "Ngày đăng cũ nhất", value: "created_at-asc" },
  { label: "Tiêu đề (A-Z)", value: "title-asc" },
  { label: "Tiêu đề (Z-A)", value: "title-desc" },
];

export const filterNewsList = [
  { label: "Đã duyệt", value: "status-approved" },
  { label: "Chờ duyệt", value: "status-waiting" },
];

export const reportList = [
  { label: "Địa chỉ của bất động sản", value: "address" },
  {
    label: "Các thông tin về: giá, diện tích, mô tả ....",
    value: "informations",
  },
  { label: "Ảnh", value: "image" },
  { label: "Trùng với tin bài khác", value: "duplicate" },
  { label: "Không liên lạc được", value: "contact" },
  { label: "Tin không có thật", value: "real" },
  { label: "Bất động sản đã bán", value: "sold" },
];

// report list
export const list = [
  { value: "address", label: "Địa chỉ bất động sản" },
  { value: "info", label: "Các thông tin: giá, diện tích, mô tả,..." },
  { value: "media", label: "Ảnh" },
  { value: "duplicate", label: "Trùng tin rao khác" },
  { value: "contact", label: "Không liên lạc được" },
  { value: "exist", label: "Tin không có thật" },
  { value: "sold", label: "Bất động sản đã bán" },
];
