import { BASE_MEDIA_UPLOAD } from "./anyVariables";

export const error = {
  // auth
  login: "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại",
  register: "Không thể đăng ký",
  notAuthen:'Vui lòng đăng nhập để Đăng tin',
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
  missingDes: "Vui lòng điền chi tiết mô tả ít nhất 150 kí tự",
  missingImages: `Số lượng ảnh cung cấp ít nhất là ${BASE_MEDIA_UPLOAD}`,
  minPrice: "Giá trị bất động sản quá nhỏ",

  // form errors
  missingName: "Chưa nhập tiêu đề",
  nameTooShort: "Chưa đủ 60 kí tự",
  nameTooLong: "Vượt quá số kí tự",
  desTooShort: "Vui lòng điền chi tiết mô tả ",
  desTooLong: "Vượt quá số kí tự",

  // alert
  note: "Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị",

  // button submit
  submit: "submit",
  save: "save",
  loadingText: "Đang chờ",
};

export const newsForm = {
  imgUrl: "Paste your image url here",
};
