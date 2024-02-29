import {
  BASE_MEDIA_UPLOAD,
  maxDesLength,
  maxLength,
  minDesLength,
  minLength,
} from "./anyVariables";

// do not remove 1200 => wait time for changing text
export const homeText = [
  "Find your dream house",
  1200,
  "We cook food",
  1200,
  "This is Landhub",
  1200,
  "Learning chemistry",
  1200,
];

export const error = {
  // auth
  login: "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại",
  register: "Không thể đăng ký",
  notAuthen: "Vui lòng đăng nhập để truy cập",
  // api re
  cantUpdate: "Không thể cập nhật bài đăng",
  cantFindToUpdate: "Không tìm thấy bài đăng để cập nhật",
  cantDelete: "Không thể xoá bài đăng",
  cantFindToDelete: "Không tìm thấy bài đăng để xoá",
};

export const success = {
  // auth
  signup:
    "Your account has been created successfully. Please check for email verification",
  login: "Đăng nhập thành công",
  logout: "Đăng xuất thành công",

  // api re
  createPost: "Tạo bài đăng thành công, đợi admin duyệt bài",
  approvePost: "Duyệt bài thành công",
  markSold: "Đánh dấu đã bán thành công",
  deactivePost: "Gỡ bài thành công",
  deletePost: "Xoá bài thành công",
};

export const reform = {
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",
  // submit errors
  missingAddress: "Chưa chọn địa chỉ",
  missingDes: `Vui lòng điền chi tiết mô tả ít nhất ${minDesLength} kí tự`,
  missingImages: `Số lượng ảnh cung cấp ít nhất là ${BASE_MEDIA_UPLOAD}`,
  minPrice: "Giá trị bất động sản quá nhỏ",

  // form errors
  missingName: "Chưa nhập tiêu đề",
  nameTooShort: `Chưa đủ ${minLength} kí tự`,
  nameTooLong: `Vượt quá ${maxLength} kí tự cho phép`,
  desTooShort: `Vui lòng điền chi tiết mô tả ít nhất ${minDesLength} kí tự`,
  desTooLong: `Vượt quá ${maxDesLength} kí tự cho phép`,

  // title helper
  noPhone:
    "Vui lòng không chia sẻ số điện thoại, giá bất động sản trong tiêu đề",

  // media
  overFile: "Vượt quá số lượng giới hạn file tải lên",
  helperMedia: "Drag & drop file here, or click to select files",

  // alert
  note: "Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị",

  // button submit
  submit: "submit",
  save: "save",
  creating: "Đang tạo",
  saving: "Đang lưu",
};

export const newsForm = {
  imgUrl: "Paste your image url here",
};
