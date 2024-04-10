import {
  BASE_MEDIA_UPLOAD,
  maxContent,
  maxDesLength,
  maxLength,
  maxName,
  maxSummary,
  maxTitle,
  minContent,
  minDesLength,
  minLength,
  minName,
  minSummary,
  minTitle,
} from "./anyVariables";

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

export const emptyREList =
  "Chưa đăng bài viết nào, dang bai di hoac thay doi sort/ filter";

export const error = {
  // general
  fetchError: "Đã xảy ra lỗi khi lấy dữ liệu",
  // if re post fetched not found (wrong slug, exprired)
  cantFindPost: "Không tồn tại bài viết",
  // auth
  login: "Tài khoản hoặc Mật khẩu không đúng",
  register: "Số điện thoại đã tồn tại",
  cantVerify: "Không thể xác thực",
  cantUpdateEmail: "Không thể cập nhật email",
  notAuthen: "Vui lòng đăng nhập để truy cập",
  notAuthor: "Không có thẩm quyền",
  cantResendSMS: "Không thể gửi mã xác thực",
  cantSendEmail: "Không thể gửi mail xác thực",
  codeExprired: "Mã xác nhận đã hết hạn",
  cantUpdatePass: "Không thể cập nhật mật khẩu",
  notVerifyEmail: "Chưa xác thực mail",
  notHavePhone: "Vui lòng cập nhật số điện thoại",
  duplicateEmail: "Địa chỉ email đã tồn tại",
  cantSendEmailResetPassword: "khong the gui email dang nhap 1 lan",

  // api re
  cantCreate: "Hiện không thể tạo bài đăng",
  cantUpdate: "Không thể cập nhật bài đăng",
  cantFindToUpdate: "Không tìm thấy bài đăng để cập nhật",
  cantDelete: "Không thể xoá bài đăng",
  cantFindToDelete: "Không tìm thấy bài đăng để xoá",
  apiGeocoding: "Không thể tìm thấy địa chỉ",
  // api news, re-use some of api re
  cantCreateNews: "Không thể tạo bài viết",
  newsExisted: "Đã tồn tại tiêu đề bài viết",

  // medias
  cantDeleteMedia: "Không thể xoá file",
  uploadFailed: "Không thể tải file",
  // docs
  cantInsertDocs: "Không thể thêm giấy tờ pháp lý",
  cantDeleteDocs: "Không thể xoá văn bản",

  // name edit
  cantEditName: "Không được chỉnh sửa",
};

export const success = {
  // v1
  signupV1: "Đăng ký thành công",

  // auth
  signup: "Đăng ký thành công",
  resendSMS: "Mã xác thực đã được gửi đến số điện thoại",

  // xac nhan sdt thanh cong
  verifyPhone: "Xác thực thành công số điện thoại",
  emailConfirm: "Xác thực thành công email",
  emailVerify: "link dang nhap da duoc gui den email",

  //
  login: "Đăng nhập thành công",
  logout: "Đăng xuất thành công",

  // api re
  createPost: "Tạo bài đăng thành công",
  updatePost: "Sửa bài đăng thành công",
  approvePost: "Duyệt bài thành công",
  markSold: "Đánh dấu đã bán thành công",
  deactivePost: "Gỡ bài thành công",
  deletePost: "Xoá bài thành công",

  // api news
  createNews: "Tạo tin tức thành công",
  updateNews: "Cập nhật thành công",
  approveNews: "Duyệt tin tức thành công thành công",
  deleteNews: "Xoá tin tức thành công",
  deactiveNews: "Gỡ tin tức thành công",

  // api account
  updateAddress: "Cập nhật địa chỉ thành công!",
  updateAvatar: "Cập nhật ảnh đại diện thành công!",
  updateUsername: "Cập nhật tên người dùng thành công!",
  updatePhone: "Cập nhật số điện thoại thành công!",
  updateOthers: "Cập nhật thành công!",
  updatePassword: "Cập nhật mật khẩu thành công, vui lòng đăng nhập lại",
  updateEmail: "Cập nhật Email thành công, vui lòng xác thực Email!",

  // others
  copyToClipboard: "Đã sao chép vào clipboard",
  createReport:'bao cao cua ban da duoc gui',
  
};

export const reform = {
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",
  // submit errors
  missingAddress: "Chưa chọn địa chỉ",
  missingDes: `Vui lòng mô tả chi tiết ít nhất ${minDesLength} kí tự`,
  missingImages: `Số lượng ảnh cung cấp ít nhất là ${BASE_MEDIA_UPLOAD}`,
  minPrice: "Giá trị bất động sản quá nhỏ",

  // form errors
  missingName: "Chưa nhập tiêu đề",
  nameTooShort: `Chưa đủ ${minLength} kí tự`,
  nameTooLong: `Vượt quá ${maxLength} kí tự cho phép`,
  desTooShort: `Vui lòng điền chi tiết mô tả ít nhất ${minDesLength} kí tự`,
  desTooLong: `Vượt quá ${maxDesLength} kí tự cho phép`,
  numberInt: "Vui lòng làm tròn số",

  // helpers
  noPhone:
    "Vui lòng không chia sẻ số điện thoại, giá bất động sản trong tiêu đề",
  requiredDocs: "Vui lòng chọn ít nhất 1 tai lieu",

  // media
  overFile: "Vượt quá số lượng giới hạn file tải lên",
  helperMedia: "Drag & drop file here, or click to select files",
  acceptMedias: "Yêu cầu định dạng png, jpg, jpeg hoặc mp4",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg & kích thước 2:1",
  overSize: `Kích thước file vượt quá giới hạn cho phép`,
  ratio: "Tỉ lệ ảnh yêu cầu 2:1",

  // alert
  note: "Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị",

  // button submit
  submit: "submit",
  save: "save",
  creating: "Đang tạo",
  saving: "Đang lưu",
};

export const newsForm = {
  // table has no news
  empty: "Hiện không có bài viết tin tức nào",
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",

  // form errors
  minTitle: `Tiêu đề ít nhất ${minTitle}`,
  maxTitle: `Tiêu đề nhiều nhất ${maxTitle}`,
  minSummary: `Tóm tắt ít nhất ${minSummary}`,
  maxSummary: `Tóm tắt nhiều nhất ${maxSummary}`,
  minContent: `Nội dung ít nhất ${minContent}`,
  maxContent: `Nội dung nhiều nhất ${maxContent}`,

  // thumbnail
  overFile: "Chỉ chấp nhận 1 file thumbnail",
  helperMedia: "Drag & drop file here, or click to select files",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg",
  overSize: `Kích thước file vượt quá giới hạn cho phép`,
  ratio: "Tỉ lệ ảnh yêu cầu 16/9",

  // submit errors
  missingThumb: "Thiếu ảnh thumbnail",

  // dialog
  dialogTitle: "Huỷ thay đổi?",
  dialogMessage:
    "Bạn có chắc muốn huỷ thay đổi? Mọi thay đổi sẽ không được lưu lại!",
  // content
  imgUrl: "Paste your image url here",
  // actions
  submit: "submit",
  save: "save",
  creating: "Đang tạo",
  saving: "Đang lưu",
};

// auth + account
export const account = {
  // auth
  requiredPhone: "Vui lòng điền đúng số điện thoại",
  requiredEmail: "Vui lòng nhập đúng địa chỉ Email",

  // account settings
  cantUpdate: "Không thể cập nhật thông tin tài khoản, vui lòng thử lại sau",
  helperMedia: "Drag & drop file here, or click to select files",
  missingAddress: "Vui lòng điền chi tiết địa chỉ",

  overFile: "vuot qua so luong file, chi duoc 1 cai thoi vi no la avt",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg",

  // name
  minName: `Ít nhất ${minName} ký tự`,
  maxName: `Vượt quá ${maxName} ký tự`,
};

// display
// empty list
export const display = {
  emptyList: "kh cos ket qua nao",
  emptyHintMessage: "thu thay doi query / filter",
};
