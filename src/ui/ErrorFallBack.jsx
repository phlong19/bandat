import { ImHome } from "react-icons/im";
import Button from "./Button";

function ErrorFallBack({ error, resetErrorBoundary, home = false }) {
  return (
    <div
      className={`${
        home ? "absolute" : "fixed"
      } inset-0 flex w-full flex-col items-center justify-center gap-4 bg-light text-center text-black dark:bg-dark dark:text-white`}
    >
      <h1 className="text-xl font-bold md:text-2xl">
        Arch! Đã có lỗi gì đó xảy ra. Vui lòng thử lại sau. 😥
      </h1>
      <p>{error.message}</p>

      <Button onClick={resetErrorBoundary} icon={<ImHome />}>
        Trang chủ
      </Button>
    </div>
  );
}

export default ErrorFallBack;
