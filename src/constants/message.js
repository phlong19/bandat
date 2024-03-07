import {
  BASE_MEDIA_UPLOAD,
  maxContent,
  maxDesLength,
  maxLength,
  maxSummary,
  maxTitle,
  minContent,
  minDesLength,
  minLength,
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
  "ban chua dang bai viet moi nao, khong co dat de ban a? ban nha di";

export const error = {
  // general
  fetchError: "da xay ra loi trong khi lay du lieu, vui long thu lai",
  // auth
  login: "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại",
  register: "Không thể đăng ký",
  notAuthen: "Vui lòng đăng nhập để truy cập",
  notAuthor: "khong co quyen de thuc hien thao tac nay",
  // api re
  cantCreate: "khong the tao bai dang luc nay, vui long thu lai sau",
  cantUpdate: "Không thể cập nhật bài đăng,vui long",
  cantFindToUpdate: "Không tìm thấy bài đăng để cập nhật, vui long",
  cantDelete: "Không thể xoá bài đăng, vui long",
  cantFindToDelete: "Không tìm thấy bài đăng để xoá, vui long",
  apiGeocoding: "khong the tim thay dia chi, vui long cung cap cu the hon ?",
  // api news, re-use some of api re
  cantCreateNews: "khong the tao bai viet tin tuc",
  newsExisted: "da ton tai bai viet voi tieu de nay?",

  // medias
  cantDeleteMedia: "xay ra loi khi xoa file, vui long thu lai",
  uploadFailed: "qua trinh tai len file xay ra loi, vui long blabla",
  // docs
  cantInsertDocs: "khong the them giay to phap ly, vui long thu lai sau",
  cantDeleteDocs: "khong the xoa docs, vui long thu lai",
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

  // api news
  createNews: "tao bai viet tin tuc thanh cong",
  updateNews: "cap nhat ok kh loi gi",
  approveNews: "duyet bai viet tin tuc thanh cong",
  deleteNews: "xoa bai ok",
  deactiveNews: "go tin tuc ok",

  // api account
  updateAddress: "cap nhat dia chi ok",
  updateAvatar: "cap nhat avatar / anh dai dien xong",
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
  acceptMedias: "chi chap nhan dinh dang png, jpg, jpeg hoac mp4",
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
  empty: "khong co bai viet tin tuc nao o day",
  // general
  requiredMessage: "Vui lòng điền đầy đủ các trường có dấu *",

  // form errors
  minTitle: `tieu de it nhat ${minTitle}`,
  maxTitle: `tieu de nhieu nhat ${maxTitle}`,
  minSummary: `tom tat it nhat ${minSummary}`,
  maxSummary: `tom tat nhieu nhat ${maxSummary}`,
  minContent: `noi dung it nhat ${minContent}`,
  maxContent: `noi dung nhieu nhat ${maxContent}`,

  // thumbnail
  overFile: "chi chap nhan 1 file thumbnail",
  helperMedia: "Drag & drop file here, or click to select files",
  acceptFiles: "chi chap nhan dinh dang png, jpg, jpeg",
  ratio: "ti le anh yeu cau la 16 / 9",

  // submit errors
  missingThumb: "thieu thumbnail",

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

// account
export const account = {
  cantUpdate: "khong the update thong tin tai khoan, vui long...",
  helperMedia: "Drag & drop file here, or click to select files",
  missingAddress: "neu da dien vui long dien du dia chi",

  overFile: "1 account nhieu avatar?",
  acceptFiles: "chi chap nhan dinh dang png, jpg, jpeg",
};
