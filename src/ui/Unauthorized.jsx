import { ImHome } from "react-icons/im";
import Button from "./Button";

function Unauthorized() {
  return (
    <div className="absolute inset-0 flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-light text-center text-black dark:bg-dark dark:text-white">
      <h1 className="text-xl font-bold md:text-2xl">
        Rất tiếc! Bạn không có quyền xem trang này 🤚
      </h1>

      <Button to="/" icon={<ImHome />}>
        Trang chủ
      </Button>
    </div>
  );
}

export default Unauthorized;
