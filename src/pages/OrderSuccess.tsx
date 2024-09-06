import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { PiCheckCircleFill, PiHouseLineFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const stage = state?.stage || 1;
  const check = stage > 2; // stage = 3
  const [time, setTime] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (!check) {
      return navigate("/", { replace: true });
    }
    if (time < 1) {
      return navigate("/");
    }

    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [navigate, check, time]);

  return (
    <Box textAlign="center" py={10} px={6} maxW={1500}>
      <PiCheckCircleFill className="mx-auto text-[70px] text-primary md:text-[80px]" />
      <Heading as="h2" size="xl" mt={6} mb={2} className="!font-dancing">
        Thank you !
      </Heading>
      <Text fontSize="md" color={"gray.500"} maxW={700}>
        Chân thành cảm ơn bạn đã lựa chọn tin tưởng [tên shop] và đặt mua sản
        phẩm. Hy vọng rằng chất lượng mà sản phẩm mang lại sẽ làm bạn cảm thấy
        hài lòng. [Tên shop] mong rằng sẽ được tiếp tục đồng hành cùng bạn trong
        những lần mua sắm sắp tới.
      </Text>
      <Button
        as={Link}
        my={6}
        fontWeight={500}
        to="/"
        leftIcon={<FaHouse className="mb-0.5" />}
        colorScheme="green"
      >
        Trang chủ
      </Button>
      <Text>Tự động về trang chủ sau {time} giây.</Text>
    </Box>
  );
}
