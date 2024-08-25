import { ADMIN_LEVEL, EDITOR_LEVEL, USER_LEVEL } from "./anyVariables";

interface Links {
  title: string;
  to: string;
  child_links: {
    title: string;
    type: string;
    child?: {
      title: string;
      type: string;
    }[];
  }[];
}

export const navLinks: Links[] = [
  {
    title: "Thực phẩm chức năng",
    to: "thuc-pham-chuc-nang",
    child_links: [
      {
        title: "Cải thiện, tăng cường chức năng",
        type: "cai-thien-tang-cuong-chuc-nang",
        child: [
          { title: "Chức năng gan", type: "chuc-nang-gan" },
          { title: "Bổ mắt", type: "bo-mat" },
          { title: "Dạ dày, đại tràng", type: "da-day" },
          { title: "Hô hấp", type: "ho-hap" },
          { title: "Tai mũi họng", type: "tai-mui-hong" },
          { title: "Thần kinh", type: "than-kinh" },
          { title: "Thận", type: "than-tien-liet-tuyen" },
          { title: "Tiểu đường", type: "tieu-duong" },
          { title: "Tim mạch, huyết áp", type: "tim-mach-huyet-ap" },
          { title: "Trà thảo mộc", type: "tra-thao-moc" },
          { title: "Tuần hoàn não", type: "tuan-hoan-nao" },
          { title: "Xương khớp", type: "xuong-khop" },
        ],
      },
      {
        title: "Cân nặng, chiều cao",
        type: "can-nang-chieu-cao",
        child: [
          { title: "Tăng cân", type: "tang-can" },
          { title: "Tăng chiều cao", type: "tang-chieu-cao" },
          { title: "Giảm cân", type: "giam-can" },
        ],
      },
      {
        title: "Men tiêu hóa",
        type: "men-tieu-hoa",

        child: [
          { title: "Men vi sinh", type: "men-vi-sinh" },
          { title: "Tiêu hóa", type: "tieu-hoa" },
        ],
      },
      {
        title: "Sữa",
        type: "sua",
        child: [
          {
            type: "sua-tieu-duong-xuong-khop",
            title: "Sữa tiểu đường, Xương khớp",
          },
          {
            title: "Người ốm dậy, bổ sung thêm",
            type: "nguoi-om-day-bo-sung-them",
          },
        ],
      },
      {
        title: "Sinh lý, nội tiết",
        type: "sinh-ly-noi-tiet",
        child: [
          { title: "Sinh lý nam", type: "sinh-ly-nam" },
          { title: "Sinh lý nữ", type: "sinh-ly-nữ" },
        ],
      },
      {
        title: "Thảo dược, thiên nhiên",
        type: "thao-duoc-thien-nhien",
        child: [
          { title: "Trà", type: "tra-thao-duoc-thien-nhien" },
          { title: "Tinh bột nghệ", type: "tinh-bot-nghe" },
        ],
      },
      {
        title: "Vitamin - Khoáng chất",
        type: "vitamin-khoang-chat",
        child: [
          { title: "Vitamin D", type: "vitamin-d" },
          {
            title: "Multivitamins, Vitamin tổng hợp",
            type: "vitamin-tong-hop",
          },
          { title: "Vitamin E", type: "vitamin-e" },
        ],
      },
    ],
  },
  {
    title: "Dược, mỹ phẩm",
    to: "duoc-my-pham",
    child_links: [
      {
        title: "Chăm sóc da chuyên sâu",
        type: "cham-soc-da-chuyen-sau",
        child: [
          { title: "Sẹo, rạn da, mát da", type: "seo-ran-da-mat-da" },
          { title: "Dung dịch vệ sinh", type: "dung-dich-ve-sinh" },
        ],
      },
      {
        title: "Chăm sóc da mặt",
        type: "cham-soc-da-mat",
        child: [
          { title: "Dưỡng da mặt", type: "duong-da-mat" },
          { title: "Sữa rửa mặt", type: "sua-rua-mat" },
        ],
      },
      {
        title: "Chăm sóc toàn thân",
        type: "cham-soc-toan-than",
        child: [
          { title: "Sữa dưỡng thể", type: "sua-duong-the" },
          { title: "Sữa tắm", type: "sua-tam" },
        ],
      },
      {
        title: "Mỹ phẩm trang điểm",
        type: "my-pham-trang-diem",
        child: [{ title: "Son môi", type: "subcategory" }],
      },
      {
        title: "Tóc, da đầu",
        type: "toc-da-dau",
        child: [
          { title: "Dầu gội", type: "dau-goi" },
          { title: "Dưỡng Tóc", type: "duong-toc" },
        ],
      },
    ],
  },
  {
    title: "Thiết bị y tế",
    to: "thiet-bi-y-te",
    child_links: [
      {
        title: "Thiết bị theo dõi sức khỏe",
        type: "thiet-bi-theo-doi-suc-khoe",
        child: [
          { title: "Máy trợ thính", type: "may-tro-thinh" },
          { title: "Máy đo huyết áp", type: "may-do-huyet-ap" },
          { title: "Máy đo đường huyết", type: "may-do-duong-huyet" },
          { title: "Nhiệt kế", type: "nhiet-ke" },
          {
            title: "Máy khí dung, xông mũi họng",
            type: "may-khi-dung-xong-mui-hong",
          },
        ],
      },
      {
        title: "Dụng cụ y tế",
        type: "dung-cu-y-te",
        child: [
          { title: "Dụng cụ hỗ trợ", type: "dung-cu-ho-tro" },
          { title: "Cân đo sức khỏe", type: "can-do-suc-khoe" },
          { title: "Khẩu trang", type: "khau-trang" },
          {
            title: "Túi chườm, miếng dán nhiệt",
            type: "tui-chuom-mieng-dan-nhiet",
          },
          { title: "Vệ sinh mũi miệng", type: "ve-sinh-mui-mieng" },
          { title: "Dụng cụ khác", type: "dung-cu-khac" },
        ],
      },
      {
        title: "Đệm điện, chăn điện",
        type: "dem-dien-chan-dien",
        child: [
          { title: "Chăn điện", type: "chan-dien" },
          { title: "Đệm điện", type: "dem-dien" },
        ],
      },
      {
        title: "Thiết bị làm đẹp",
        type: "thiet-bi-lam-dep",
        child: [{ title: "Máy rửa mặt", type: "may-rua-mat" }],
      },
    ],
  },
  {
    title: "Sâm Hàn Quốc",
    to: "sam-nam-han-quoc",
    child_links: [
      { title: "Nhân sâm Hàn Quốc", type: "nhan-sam-han-quoc" },
      { title: "Cao hồng sâm Hàn Quốc", type: "cao-hong-sam-han-quoc" },
      { title: "Hồng sâm khô Hàn Quốc", type: "hong-sam-kho-han-quoc" },
      {
        title: "Hồng sâm tẩm mật ong Hàn Quốc",
        type: "hong-sam-tam-mat-ong-han-quoc",
      },
      {
        title: "Nước hồng sâm trẻ em Hàn Quốc",
        type: "nuoc-hong-sam-tre-em-han-quoc",
      },
      {
        title: "Nước hồng sâm, linh chi Hàn Quốc",
        type: "nuoc-hong-sam-han-quoc",
      },
      {
        title: "Trà nhân sâm linh chi Hàn Quốc",
        type: "tra-nhan-sam-linh-chi-han-quoc",
      },
      { title: "Kẹo sâm Hàn Quốc", type: "keo-sam-han-quoc" },
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
