import { useForm } from "react-hook-form";
import { useRegister } from "./useRegister";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";

// FIX - form too long, thinking about splitting into steps

function RegisterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useRegister();

  function onSubmit(data) {
    console.log(data);
    signup(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto w-72 space-y-7 py-3 pt-10 text-center"
      >
        <h2 className="pb-3 font-lexend text-3xl font-medium text-primary dark:text-secondary">
          Đăng ký
        </h2>
        <FormInput
          label="Họ và tên"
          id="fullName"
          hookForm={{
            ...register("fullName", {
              required: "ten may la gi",
              minLength: { message: "deo du 8 ky tu", value: 8 },
            }),
          }}
          errors={errors}
        />

        {/* <FormInput
          label="Số điện thoại"
          id="phone"
          type="tel"
          hookForm={{
            ...register("phone", {
              required: "cho bo cai dia chi",
              pattern: "[0-9]{4}-[0-9]{3}-[0-9]{3}",
            }),
          }}
          errors={errors}
        /> */}
        <FormInput
          label="Email"
          id="email"
          type="email"
          hookForm={{
            ...register("email", { required: "vui long nhap email" }),
          }}
          errors={errors}
        />

        <FormInput
          label="Mật khẩu"
          id="password"
          type="password"
          hookForm={{
            ...register("password", {
              required: "nhap cmm mat khau vao",
              minLength: { message: "kh du 8", value: 8 },
            }),
          }}
          errors={errors}
        />

        <FormInput
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          type="password"
          errors={errors}
          hookForm={{
            ...register("confirmPassword", {
              required: "dm kh xac nhan mk ak",
              minLength: { message: "kh du 8", value: 8 },
              validate: (value) => {
                return (
                  value === getValues("password") || "Password does not match"
                );
              },
            }),
          }}
        />

        <Button gap={false} width>
          {isLoading ? <Spinner /> : "Đăng ký"}
        </Button>
      </form>
      <div>
        <Link to="/dang-nhap">dang nhap</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
