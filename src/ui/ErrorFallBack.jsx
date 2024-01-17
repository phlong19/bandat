import { ImHome } from "react-icons/im";
import Button from "./Button";

function ErrorFallBack() {
  return (
    <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-light text-center dark:bg-dark">
      <h1 className="text-xl font-bold md:text-2xl">
        Arch! Đã có lỗi gì đó xảy ra. Vui lòng thử lại sau. 😥
      </h1>

      <Button to="/" icon={<ImHome />}>
        Trang chủ
      </Button>
    </div>
  );
}

export default ErrorFallBack;
