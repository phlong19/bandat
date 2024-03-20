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
  "Chưa đăng bài viết nào, khong co dat de ban a? ban nha di";

export const error = {
  // general
  fetchError: "Đã xảy ra lỗi khi lấy dữ liệu, Vui lòng thử lại sau",
  // if re post fetched not found (wrong slug, exprired)
  cantFindPost: "bai viet khong ton tai hoac da het han",
  // auth
  login: "email / sdt hoặc Mật khẩu không đúng, vui lòng thử lại",
  register: "Không thể đăng ký, sdt da ton tai",
  cantVerify: "khong the xac thuc so dien thoai, ma khong ton tai hoac het han",
  cantUpdateEmail: "khong the update email luc nay?",
  notAuthen: "Vui lòng đăng nhập để truy cập",
  notAuthor: "Phân quyền hiện tại không được phép thao tác",
  cantResendSMS: "khong the gui lai ma xac nhan sms, vui long...",
  cantSendEmail: "khong the gui email xac thuc",
  codeExprired: "ma xac nhan da het han, vui long nhan gui lai ma moi",
  cantUpdatePass: "khong the update mk",
  notVerifyEmail: "xac thuc email truoc da",
  notHavePhone: "chua co sdt, vui long cap nhat",

  // api re
  cantCreate: "Hiện không thể tạo bài đăng, Vui lòng thử lại sau",
  cantUpdate: "Không thể cập nhật bài đăng, Vui lòng thử lại sau",
  cantFindToUpdate: "Không tìm thấy bài đăng để cập nhật, Vui lòng thử lại sau",
  cantDelete: "Không thể xoá bài đăng, Vui lòng thử lại sau",
  cantFindToDelete: "Không tìm thấy bài đăng để xoá, Vui lòng thử lại sau",
  apiGeocoding: "Không thể tìm thấy địa chỉ, Vui lòng cung cấp cụ thể?",
  // api news, re-use some of api re
  cantCreateNews: "Không thể tạo bài viết",
  newsExisted: "Tiêu đề bài viết đã tồn tại?",

  // medias
  cantDeleteMedia: "Xảy ra lỗi, Vui lòng thử lại sau",
  uploadFailed: "Quá trình tải file xảy ra lỗi, Vui lòng thử lại sau",
  // docs
  cantInsertDocs: "Không thể thêm giấy tờ pháp lý, Vui lòng thử lại sau ",
  cantDeleteDocs: "Không thể xoá văn bản, Vui lòng thử lại sau",

  // name edit
  cantEditName: "chua den ngay edit, 30 ngay",
};

export const success = {
  // v1
  signupV1: "dang ky thanh cong, check email",

  // auth
  signup: "dang ky thanh cong, check dien thoai nhap ma de",
  resendSMS: "mot ma xac nhan moi da duoc gui ve thiet bi",

  // xac nhan sdt thanh cong
  verifyPhone: "xac nhan sdt thanh cong",
  emailConfirm: "vui long kiem tra email",

  //
  login: "Đăng nhập thành công",
  logout: "Đăng xuất thành công",

  // api re
  createPost: "Tạo bài đăng thành công, đợi admin duyệt bài",
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
  updateAddress: "Cập nhật địa chỉ thành công",
  updateAvatar: "Cập nhật ảnh đại diện thành công",
  updateUsername: "Cập nhật tên người dùng thành công",
  updatePhone: "thanh cong cap nhat sdt",
  updateOthers: "Cập nhật thành công",
  updatePassword: "cap nhat mk thanh cong, vui long dang nhap lai",

  // others
  copyToClipboard: "da sao chep vao bo nho tam",
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
  numberInt: "vui long lam tron so",

  // helpers
  noPhone:
    "Vui lòng không chia sẻ số điện thoại, giá bất động sản trong tiêu đề",
  requiredDocs: "Vui lòng chọn ít nhất 1 tai lieu",

  // media
  overFile: "Vượt quá số lượng giới hạn file tải lên",
  helperMedia: "Drag & drop file here, or click to select files",
  acceptMedias: "Yêu cầu định dạng png, jpg, jpeg hoặc mp4",
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
  ratio: "Tỉ lệ ảnh yêu cầu 16/9",

  // submit errors
  missingThumb: "Thiếu thumbnail?",

  // dialog
  dialogTitle: "Discard Changes?",
  dialogMessage:
    "Are you sure you want to discard? You will lose everything you're entered so far if you leave now",
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
  requiredPhone: "vui long dien sdt",
  requiredEmail: "vui long nhap email",

  // account settings
  cantUpdate: "Không thể cập nhật thông tin tài khoản, Vui lòng thử lại sau",
  helperMedia: "Drag & drop file here, or click to select files",
  missingAddress: "Vui lòng điền chi tiết địa chỉ",

  overFile: "1 account nhieu avatar?",
  acceptFiles: "Yêu cầu định dạng png, jpg, jpeg",

  // name
  minName: `Ít nhất ${minName} ký tự`,
  maxName: `Vượt quá ${maxName} ký tự`,
};
