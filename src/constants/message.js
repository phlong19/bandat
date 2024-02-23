import { BASE_MEDIA_UPLOAD } from "./anyVariables";

export const error = {
  // auth
  login: "khong the dang nhap luc nay",
  register: "khong the dang ky luc nay",
  notAuthen:'vui long dang nhap de xem trang',
  // api re
  cantUpdate: "khong the update post",
  cantFindToUpdate: "khong tim thay post nao ma update",
  cantDelete: "khong the xoa post",
  cantFindToDelete: "khong tim thay post de xoa",
};

export const success = {
  // auth
  signup:
    "Your account has been created successfully. Please check for email verification",
  login: "dang nhap thanh cong",
  logout: "dang xuat thanh cong",

  // api re
  createPost: "tao bai dang thanh cong, chi con cho duoc duyet thoi :3",
  approvePost: "duyet bai thanh cong",
  markSold: "danh dau la da ban thanh cong",
  deactivePost: "go bai thanh cong",
  deletePost: "xoa bai thanh cong",
};

export const reform = {
  // general
  requiredMessage: "khong thay dau sao do a?",
  // submit errors
  missingAddress: "thieu dia chi",
  missingDes: "vui long dien mo ta chi tiet",
  missingImages: `so luong anh cung cap it nhat la ${BASE_MEDIA_UPLOAD}`,
  minPrice: "gia tri bat dong san qua nho",

  // form errors
  missingName: "ten bai viet la gif?",
  nameTooShort: "viet dai them vao",
  nameTooLong: "dm vuot qua so ki tu roi",
  desTooShort: "vui long cung cap them chi tiet va mo ta",
  desTooLong: "dai the? hoc sinh gioi van quoc gia a",

  // alert
  note: "Mỗi lần submit sửa là bài đăng sẽ chờ duyệt lại, đảm bảo đúng các thông tin để đỡ phải sửa nhiều, bài đăng luôn được hiển thị :D",

  // button submit
  submit: "submit",
  save: "save",
  loadingText: "Chờ tí",
};

export const newsForm = {
  imgUrl: "Paste your image url here",
};
