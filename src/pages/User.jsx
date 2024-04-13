import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

function User() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("u");
// TODO
  useEffect(() => {
    if (!id) {
      toast.error("Không tìm thấy người dùng");
      return navigate("/danh-ba");
    }
  }, [id, navigate]);

  return <div>{id}</div>;
}

export default User;
