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
      { title: "Bán kho, nhà xưởng", type: "kho-nha-xuong" },
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

export const mobileNavLinks = [
  { title: "Tin đăng đã lưu", icon: "RegHeart", to: "tin-da-luu" },
  { title: "Trang chủ", icon: "House", to: "/" },
  {
    title: "Nhà đất bán",
    icon: "HouseFlag",
    to: "nha-dat-ban",
    child_links: [
      { title: "", icon: "", to: "" },
      { title: "", icon: "", to: "" },
    ],
  },
  {
    title: "Nhà đất cho thuê",
    icon: "BuildingFlag",
    to: "nha-dat-cho-thue",
    child_links: [
      { title: "", icon: "", to: "" },
      { title: "", icon: "", to: "" },
    ],
  },
  { title: "Dự án", icon: "City", to: "du-an" },
  { title: "Tin tức", icon: "RegNewspaper", to: "tin-tuc" },
  // later
  { title: "Góp ý - Báo lỗi", icon: "RegAddressBook", to: "hom-thu-gop-y" },
  { title: "Giới thiệu về chúng tôi", icon: "RegAddressBook", to: "danh-ba" },
  { title: "Liên hệ", icon: "RegAddressBook", to: "danh-ba" },
  //
];

export const homeLinks = [
  { img: "./for_sell.svg", title: "Mua bán", to: "nha-dat-ban" },
  { img: "./for_rent.svg", title: "Cho thuê", to: "nha-dat-cho-thue" },
  { img: "./project.svg", title: "Dự án", to: "du-an" },
];

export const sellSelectOptions = [
  { value: "nha-rieng", label: "Nhà riêng" },
  { value: "can-ho-chung-cu", label: "Căn hộ chung cư" },
  { value: "biet-thu-lien-ke", label: "Nhà biệt thự, liền kề" },
  { value: "nha-mat-pho", label: "Nhà mặt phố" },
  {
    value: "shophouse-nha-pho-thuong-mai",
    label: "Shophouse, nhà phố thương mại",
  },
  { value: "dat-nen-du-an", label: "Đất nền dự án" },
  { value: "trang-trai-khu-nghi-duong", label: "Trang trại, khu nghỉ dưỡng" },
  { value: "condotel", label: "Condotel" },
  { value: "kho-nha-xuong", label: "Kho, nhà xưởng" },
  { value: "cac-loai-khac", label: "Loại bất động sản khác" },
];

export const rentSelectOptions = [
  { label: "Nhà riêng", value: "nha-rieng" },
  { label: "Căn hộ chung cư", value: "can-ho-chung-cu" },
  { label: "Nhà biệt thự, liền kề", value: "biet-thu-lien-ke" },
  { label: "Nhà mặt phố", value: "nha-mat-pho" },
  {
    label: "Shophouse, nhà phố thương mại",
    value: "shophouse-nha-pho-thuong-mai",
  },
  { label: "Nhà trọ, phòng trọ", value: "nha-tro-phong-tro" },
  { label: "Văn phòng", value: "van-phong" },
  {
    label: "Cửa hàng, ki ốt",
    value: "cua-hang-ki-ot",
  },
  { label: "Kho, nhà xưởng, đất", value: "kho-nha-xuong-dat" },
  { label: "Loại bất động sản khác", value: "cac-loai-khac" },
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
