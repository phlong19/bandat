import supabase from "./supabase";
import { USER_LEVEL } from "../constants/anyVariables";
import { error } from "../constants/message";

export async function login({ email, password }) {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) throw new Error(error.login);

  return data;
}

export async function register({ fullName, email, password }) {
  const { data: justCreateUser, error: registerError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (registerError) {
    console.log(registerError);
  }

  const { data, error: profileError } = await supabase
    .from("Profile")
    .insert([
      {
        id: justCreateUser.user.id,
        fullName: fullName,
        level: USER_LEVEL,
        email,
      },
    ])
    .select();

  if (profileError) {
    throw new Error(error.register);
  }

  return data;
}

// authenticated user want to post => have to verify phone num
export async function verify(phone, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
  });
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error: getUserError } = await supabase.auth.getUser();

  if (getUserError) throw new Error(getUserError.message);

  const { data: profile, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("id", data.user.id);

  if (error) throw new Error(error.message);

  const possibleUser = data?.user;

  return { possibleUser, profile };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
  // interview stories ;))
  return null;
}
