import supabase from "./supabase";
const defaultAvatar =
  "https://res.cloudinary.com/ddot3p3my/image/upload/v1690302821/users/image_2023-07-25_233343045_zggymb.png";

export async function login({ email, password }) {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) throw new Error(loginError.message);

  // const {data:userData,error}=await supabase.from('')

  return data;
}

export async function register({ fullName, email, phone, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        phoneNumber: phone,
        fullName: fullName,
        avatar: defaultAvatar,
        level: 1, // test access level
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
