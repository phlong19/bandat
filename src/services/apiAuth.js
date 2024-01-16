import supabase from "./supabase";
import { ADMIN_LEVEL, defaultAvatar } from "../constants/anyVariables";

export async function login({ email, password }) {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) throw new Error(loginError.message);

  return data;
}

export async function register({ fullName, email, phone, password }) {
  const { data: justCreateUser, error: createNewError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (createNewError) throw new Error(createNewError.message);

  // insert profile after created user successfully
  // for development, auto add user level as admin = 3
  const { data, error } = await supabase
    .from("Profile")
    .insert([
      {
        id: justCreateUser.user.id,
        fullName: fullName,
        phone: phone,
        level: ADMIN_LEVEL,
        avatar: defaultAvatar,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// FIX - also get user information in profile table
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
