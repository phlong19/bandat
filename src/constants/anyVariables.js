// max item 1 page
export const LIMIT_PER_PAGE = 10;

// level access
const USER_LEVEL = 1;
const EDITOR_LEVEL = 2;
const ADMIN_LEVEL = 3;

export { USER_LEVEL, EDITOR_LEVEL, ADMIN_LEVEL };

// admin email whitelist
export const emailsList = import.meta.env.VITE_ADMIN_WHITELIST.split(" ");

// as the name said
export const defaultAvatar =
  "https://res.cloudinary.com/ddot3p3my/image/upload/v1690302821/users/image_2023-07-25_233343045_zggymb.png";

// social media links
const fb = "";
const ins = "";
const x = "";
const git = "https://github.com/phlong19/bandat/";
export { fb, ins, x, git };
