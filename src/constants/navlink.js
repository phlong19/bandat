import { ADMIN_LEVEL, EDITOR_LEVEL, USER_LEVEL } from "./anyVariables";

export const navLinks = [
  {
    title: "Nhà đất bán",
    to: "nha-dat-ban",
    child_links: [
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
      { title: "Bán kho, nhà xưởng", type: "kho-nha-xuong-dat" },
      { title: "Bán loại bất động sản khác", type: "cac-loai-khac" },
    ],
  },
  {
    title: "Nhà đất cho thuê",
    to: "nha-dat-cho-thue",
    child_links: [
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
      { title: "Cho thuê kho, nhà xưởng, đất", type: "kho-nha-xuong-dat" },
      { title: "Cho thuê loại bất động sản khác", type: "cac-loai-khac" },
    ],
  },
];

export const mobileNavLinks = {
  base: [
    { title: "Đăng tin", icon: "RegPenToSquare", to: "dang-tin" },
    { title: "Tin đăng đã lưu", icon: "RegHeart", to: "tin-da-luu" },
    { title: "Trang chủ", icon: "House", to: "/" },
    { title: "Nhà đất bán", icon: "HouseFlag", to: "nha-dat-ban" },
    { title: "Nhà đất cho thuê", icon: "BuildingFlag", to: "nha-dat-cho-thue" },
    { title: "Dự án", icon: "City", to: "du-an" },
    { title: "Tin tức", icon: "RegNewspaper", to: "tin-tuc" },
    // later
    { title: "Góp ý - Báo lỗi", icon: "RegAddressBook", to: "hom-thu-gop-y" },
    { title: "Giới thiệu về chúng tôi", icon: "RegAddressBook", to: "danh-ba" },
    { title: "Liên hệ", icon: "RegAddressBook", to: "danh-ba" },
    //
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
  ],
};

export const homeLinks = [
  { img: "./for_sell.svg", title: "Mua bán", to: "nha-dat-ban" },
  { img: "./for_rent.svg", title: "Cho thuê", to: "nha-dat-cho-thue" },
  { img: "./project.svg", title: "Dự án", to: "du-an" },
];

export const areaOptions = [
  { label: "Dưới 30m²", value: "0-30" },
  { label: "30 - 50m²", value: "30-50" },
  { label: "50 - 80m²", value: "50-80" },
  { label: "80 - 100m²", value: "80-100" },
  { label: "100 - 150m²", value: "100-150" },
  { label: "150 - 200m²", value: "150-200" },
  { label: "200 - 250m²", value: "200-250" },
];

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
