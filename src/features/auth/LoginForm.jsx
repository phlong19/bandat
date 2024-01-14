import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import MiniSpinner from "../../ui/MiniSpinner";

function LoginForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { login, isLoggingIn } = useLogin();

  function onSubmit(data) {
    if (!getValues("email") || !getValues("password")) return;
    login(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto w-72 space-y-7 py-3 pt-10 text-center"
    >
      <h2 className="pb-3 font-lexend text-3xl font-medium text-primary dark:text-secondary">
        Đăng nhap
      </h2>
      <FormInput
        label="Email"
        errors={errors}
        hookForm={{
          ...register("email", {
            required: "nhap email vao",
            value: "kpm68635@omeie.com",
          }),
        }}
        id="email"
        type="email"
      />
      <FormInput
        type="password"
        label="Mật khẩu"
        errors={errors}
        hookForm={{
          ...register("password", {
            required: "nhap mk vao dcm",
            value: "123456789",
          }),
        }}
        id="password"
      />

      <Button width>{isLoggingIn ? <MiniSpinner /> : "dang nhap"}</Button>
    </form>
  );
}

export default LoginForm;
