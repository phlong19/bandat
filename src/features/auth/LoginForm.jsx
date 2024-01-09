import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { register, handleSubmit, getValues } = useForm();
  const { login, isLoggingIn } = useLogin();

  // isLoggingIn for spinner render

  function onSubmit(data) {
    if (!getValues("email") || !getValues("password")) return;
    login(data);
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 flex w-64 flex-col py-3"
    >
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        {...register("email", { required: true })}
      />
      <label htmlFor="pass">mat khau</label>
      <input
        type="password"
        id="pass"
        {...register("password", { required: true })}
      />

      <button className="mt-2">
        {isLoggingIn ? "dang dang nhap, doi 1 ty" : "login"}
      </button>
    </form>
  );
}

export default LoginForm;
