import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit()} className="mx-4 flex w-64 flex-col py-3">
      <label htmlFor="phone">sdt</label>
      <input type="text" id="phone" {...register("phone")} />
      <label htmlFor="pass">mat khau</label>
      <input type="password" id="pass" {...register("password")} />

      <button className="mt-2">login</button>
    </form>
  );
}

export default Login;
