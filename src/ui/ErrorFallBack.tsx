import { ImHome } from "react-icons/im";
import Button from "./Button.tsx";

interface Props {
  error: { message: string };
  resetErrorBoundary: () => void;
}

function ErrorFallBack({ error, resetErrorBoundary }: Props) {
  return (
    <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-light text-center text-black dark:bg-dark dark:text-white">
      <h1 className="text-xl font-bold md:text-2xl">
        Arch! Đã có lỗi gì đó xảy ra. Vui lòng thử lại sau. 😥
      </h1>
      <p className="max-w-[70%]">{error.message}</p>

      <Button onClick={resetErrorBoundary} icon={<ImHome />}>
        Trang chủ
      </Button>
    </div>
  );
}

export default ErrorFallBack;
