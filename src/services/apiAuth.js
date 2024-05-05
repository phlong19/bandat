import supabase from "./supabase";
import validator from "validator";
import { landhub, USER_LEVEL } from "../constants/anyVariables";
import { error as errorMessage } from "../constants/message";
import { addDays } from "date-fns";

// [DEPRECATED] login v2
export async function login(formData) {
  const { emailOrPhone, password } = formData;
  // check is email or phone number
  let credential;

  if (validator.isEmail(emailOrPhone)) {
    credential = {
      email: emailOrPhone,
      password,
    };
  } else if (validator.isMobilePhone(emailOrPhone, "vi-VN")) {
    credential = {
      phone: `84${emailOrPhone.slice(1)}`,
      password,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword(credential);

  if (error) {
    console.log(error);
    throw new Error(errorMessage.login);
  }

  return data;
}

// register v1 just email
export async function registerV1(formData) {
  const { fullName, email, password } = formData;

  const { data: justCreateUser, error: registerError } =
    await supabase.auth.signUp({ email, password });

  if (registerError) {
    console.log(registerError);
    throw new Error(errorMessage.register);
  }

  const { data, error: profileError } = await supabase
    .from("Profile")
    .insert([
      {
        id: justCreateUser.user.id,
        fullName,
        level: USER_LEVEL,
        email,
        allowEditDate: addDays(new Date(), 30),
      },
    ])
    .select();

  if (profileError) {
    console.log(profileError);
    throw new Error(errorMessage.register);
  }

  return data;
}

// [DEPRECATED]
export async function register(formData) {
  const { fullName, phone, password } = formData;

  const { data: justCreateUser, error: registerError } =
    await supabase.auth.signUp({
      phone: `+84${phone}`,
      // for now just use UK number
      // phone: `+44${phone}`,
      password,
    });

  if (registerError) {
    console.log(registerError);
    throw new Error(errorMessage.register);
  }

  const { data, error: profileError } = await supabase
    .from("Profile")
    .insert([
      {
        id: justCreateUser.user.id,
        fullName,
        level: USER_LEVEL,
        phone,
      },
    ])
    .select();

  if (profileError) {
    console.log(profileError);
    throw new Error(errorMessage.register);
  }

  return data;
}

export async function verify(phone, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantVerify);
  }

  return data;
}

// update email after successfully confirm phone number
export async function updateEmail(email) {
  const { data, error } = await supabase.auth.updateUser({ email });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.duplicateEmail);
  }

  // update profile
  const { error: updateProfileError } = await supabase
    .from("Profile")
    .update({ email })
    .eq("id", data.user.id);

  if (updateProfileError) {
    console.log(updateProfileError);
    throw new Error(errorMessage.cantUpdateEmail);
  }

  return data;
}

// resend email
export async function resendEmailAPI(email) {
  const updatedUser = await updateEmail(email);
  if (!updatedUser) {
    throw new Error(errorMessage.cantUpdateEmail);
  }

  const { data, error } = await supabase.auth.resend({
    email,
    type: "signup",
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantSendEmail);
  }

  return data;
}

// resend phone
export async function resendSMSAPI(phone) {
  const { data, error } = await supabase.auth.resend({
    type: "sms",
    phone,
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantResendSMS);
  }

  return data;
}

// send email reset password link
export async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${landhub}/tai-khoan`,
      shouldCreateUser: false,
    },
    // options: { emailRedirectTo: `${local}/tai-khoan` },
  });

  if (error) {
    console.log(error);
    throw new Error(errorMessage.cantSendEmailResetPassword);
  }

  return null;
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
