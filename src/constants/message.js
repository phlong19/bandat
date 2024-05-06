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
  "Bạn có nhu cầu mua nhà?",
  1000,
  "Với giá phải chăng?",
  1000,
  "Với vị trí thuận tiện?",
  1000,
  "Hãy cùng tìm kiếm nhé 😁",
  1000,
];

export const emptyREList =
  "Chưa đăng bài viết nào, hãy đăng bài viết đầu tiên của bạn!";

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
  cantSendEmailResetPassword:
    "Không thể gửi email đăng nhập lúc này, vui lòng thử lại sau!",

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
  cantEditName: "Chỉ có thể chỉnh sửa tiếp sau 30 ngày từ lúc sửa",

  // report
  cantCreateReport: "Chưa thể gửi báo cáo",

  // bookmark
  postExist: "Bài đăng đã tồn tại trong danh sách tin lưu",
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
  emailVerify: "Đã gửi mail xác thực",

  //
  login: "Đăng nhập thành công",
  logout: "Đăng xuất thành công",

  // api re
  createPost: "Tạo bài đăng thành công",
  updatePost: "Sửa bài đăng thành công",
  approvePost: "Duyệt bài thành công",
  markSold: "Đánh dấu bài đã giao dịch thành công",
  deactivePost: "Gỡ bài viết thành công",
  deletePost: "Xoá bài viết thành công",

  // api news
  createNews: "Tạo tin tức thành công",
  updateNews: "Cập nhật thành công",
  approveNews: "Duyệt tin tức thành công",
  deleteNews: "Đã xoá tin tức thành công",
  deactiveNews: "Đã gỡ tin tức thành công",

  // api account
  updateAddress: "Cập nhật địa chỉ thành công!",
  updateAvatar: "Cập nhật ảnh đại diện thành công!",
  updateUsername: "Cập nhật tên người dùng thành công!",
  updatePhone: "Cập nhật số điện thoại thành công!",
  updateOthers: "Cập nhật thành công!",
  updatePassword: "Cập nhật mật khẩu thành công, vui lòng đăng nhập lại",
  updateEmail: "Cập nhật Email thành công, vui lòng xác thực Email!",

  // others
  copyToClipboard: "Đã sao chép vào bộ nhớ tạm",
  createReport: "Gửi báo cáo thành công",

  // bookmark
  addedBookmark: "Đã thêm vào danh sách tin lưu",
  removedBookmark: "Đã gỡ khỏi danh sách tin lưu",
};

export const reform = {
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",
  // submit errors
  missingAddress: "Chưa chọn địa chỉ",
  missingDes: `Vui lòng mô tả chi tiết ít nhất ${minDesLength} kí tự`,
  missingImages: `Số lượng ảnh cung cấp ít nhất là ${BASE_MEDIA_UPLOAD} ảnh`,
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
  requiredDocs: "Vui lòng chọn ít nhất 1 tài liệu",

  // media
  overFile: "Vượt quá số lượng giới hạn file tải lên",
  helperMedia: "Kéo & thả file tại đây, hoặc click chọn file trong máy tính",
  acceptMedias: "Yêu cầu định dạng png, jpg, jpeg hoặc mp4",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg & tỉ lệ ảnh 2:1",
  overSize: `Kích thước file vượt quá giới hạn cho phép`,
  ratio: "Tỉ lệ ảnh yêu cầu 2:1",

  // alert
  note: "Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, hãy đảm bảo đúng các thông tin,bài đăng luôn được hiển thị",

  // button submit
  submit: "Tạo bài viết",
  save: "Lưu thay đổi",
  creating: "Đang tạo",
  saving: "Đang lưu",
};

export const newsForm = {
  // table has no news
  empty: "Hiện không có bài viết tin tức nào",
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",

  // form errors
  minTitle: `Tiêu đề ít nhất ${minTitle} ký tự`,
  maxTitle: `Tiêu đề nhiều nhất ${maxTitle} ký tự`,
  minSummary: `Tóm tắt ít nhất ${minSummary} ký tự`,
  maxSummary: `Tóm tắt nhiều nhất ${maxSummary} ký tự`,
  minContent: `Nội dung ít nhất ${minContent} ký tự`,
  maxContent: `Nội dung nhiều nhất ${maxContent} ký tự`,

  // thumbnail
  overFile: "Chỉ chấp nhận 1 file thumbnail",
  helperMedia: "Kéo & thả file tại đây, hoặc chọn file trong máy tính",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg",
  overSize: `Kích thước file vượt quá giới hạn cho phép`,
  ratio: "Tỉ lệ ảnh yêu cầu 16:9",

  // submit errors
  missingThumb: "Thiếu ảnh thumbnail",

  // dialog
  dialogTitle: "Huỷ thay đổi?",
  dialogMessage:
    "Bạn có chắc muốn huỷ thay đổi? Mọi thay đổi sẽ không được lưu lại!",
  // content
  imgUrl: "Dán đường dẫn ảnh tại đây",
  // actions
  submit: "Tạo tin tức",
  save: "Lưu",
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
  helperMedia: "Kéo & thả file tại đây, hoặc chọn file trong máy tính",
  missingAddress: "Vui lòng điền chi tiết địa chỉ",

  overFile: "Vượt quá số lượng ảnh",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg",

  // name
  minName: `Ít nhất ${minName} ký tự`,
  maxName: `Vượt quá ${maxName} ký tự`,
};

// display
// empty list
export const display = {
  emptyList: "Không tồn tại kết quả nào",
  emptyHintMessage: "Thử thay đổi bộ lọc, từ khóa tìm kiếm",
};
