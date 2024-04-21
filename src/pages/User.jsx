import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser } from "../services/apiGeneral";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import BreadCrumb from "../ui/BreadCrumb";
import GoBackButton from "../ui/GoBackButton";

function User() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("u");

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  // TODO
  useEffect(() => {
    if (!id) {
      toast.error("Không tìm thấy người dùng");
      return navigate("/danh-ba");
    }
  }, [id, navigate]);

  console.log(data);

  return (
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
      <BreadCrumb base="Danh bạ" />

      <div className="mt-5">
        <Flex my={2} ml={2}>
          <GoBackButton />
        </Flex>

        {isLoading ? (
          <Center minH="60dvh">
            <Spinner />
          </Center>
        ) : (
          <Center>{data.fullName}</Center>
        )}
      </div>
    </div>
  );
}

export default User;
