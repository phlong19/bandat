import {
  BASE_MEDIA_UPLOAD,
  maxDesLength,
  maxLength,
  minDesLength,
  minLength,
} from "./anyVariables";

// nen de may cau
export const homeText = [
  "Find your dream house",
  1000,
  "Find your real home",
  1000,
  "Find your nhà ở",
  1000,
  "Learning chemistry",
  1000,
];

export const error = {
  // auth
  login: "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại",
  register: "Không thể đăng ký",
  notAuthen: "Vui lòng đăng nhập để truy cập",
  // api re
  cantCreate:'khong the tao bai dang luc nay, vui long thu lai sau',
  cantUpdate: "Không thể cập nhật bài đăng",
  cantFindToUpdate: "Không tìm thấy bài đăng để cập nhật",
  cantDelete: "Không thể xoá bài đăng",
  cantFindToDelete: "Không tìm thấy bài đăng để xoá",
  apiGeocoding: "khong the tim thay dia chi, vui long cung cap cu the hon ?",
  fetchError: "da xay ra loi trong khi lay du lieu, vui long thu lai",
};

export const success = {
  // auth
  signup:
    "Your account has been created successfully. Please check for email verification",
  login: "Đăng nhập thành công",
  logout: "Đăng xuất thành công",

  // api re
  createPost: "Tạo bài đăng thành công, đợi admin duyệt bài",
  updatePost: "sua bai dang thanh cong",
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

  // helpers
  noPhone:
    "Vui lòng không chia sẻ số điện thoại, giá bất động sản trong tiêu đề",
  requiredDocs: "vui long pick it nhat 1",

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
