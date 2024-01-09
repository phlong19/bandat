import { useForm } from "react-hook-form";
import { useRegister } from "./useRegister";

function RegisterForm() {
  const { register, handleSubmit, getValues } = useForm();
  // yep, duplicate with this 'register'
  const { signup, isLoading } = useRegister();

  // isLoggingIn for spinner render

  function onSubmit(data) {
    console.log(data);
    // losing phone number, need FIX
    signup(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 flex w-64 flex-col py-3"
    >
      <label htmlFor="fullName">full name</label>
      <input
        type="text"
        id="fullName"
        {...register("fullName", { required: true })}
      />
      <label htmlFor="phone">phone</label>
      <input type="tel" id="phone" {...register("phone", { required: true })} />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        {...register("email", { required: true })}
      />
      <label htmlFor="pass">mat khau</label>
      <input
        type="password"
        id="pass"
        {...register("password", { required: true })}
      />
      <label htmlFor="repass">re - mat khau</label>
      <input
        type="password"
        id="repass"
        {...register("passwordConfirm", {
          required: true,
          validate: (value) => {
            return value === getValues("password") || "Password does not match";
          },
        })}
      />

      <button className="mt-2">{isLoading ? "dang tao tk" : "dang ky"}</button>
    </form>
  );
}

export default RegisterForm;
