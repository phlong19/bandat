import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function register({ fullName, email, phone, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    phone,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
        level: 1, // test access level
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
