import { Avatar, Stack, Text, Box, useColorModeValue } from "@chakra-ui/react";
import Slider from "react-slick";
import CustomArrow from "../ui/CustomArrow";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <CustomArrow direction="prev" />,
  nextArrow: <CustomArrow direction="next" />,
};

function Testimonials() {
  const bg = useColorModeValue("white", "darker");
  const color = useColorModeValue("gray.400", "gray.400");

  return (
    <Slider
      {...settings}
      className="h-[500px] max-h-[500px] min-h-[500px] md:h-[450px] md:max-h-[450px] md:min-h-[450px]"
    >
      {data.map((item, i) => (
        <Stack
          bg={bg}
          key={i}
          pt={16}
          px={8}
          spacing={{ base: 8, md: 10 }}
          align={"center"}
          direction={"column"}
          maxH={{ base: 500, md: 400 }}
          minH={{ base: 500, md: 400 }}
          h={{ base: 500, md: 400 }}
          display="flex"
        >
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            textAlign={"center"}
            maxW={"3xl"}
            mx="auto"
            my={2}
          >
            {item.message}
          </Text>
          <Box textAlign={"center"} py={2}>
            <Avatar src={item.avatar} name={item.name} mb={2} />

            <Text fontWeight={600}>{item.name}</Text>
            <Text fontSize={"sm"} color={color}>
              {item.role}
            </Text>
          </Box>
        </Stack>
      ))}
    </Slider>
  );
}

export default Testimonials;

// fake
const data = [
  {
    message: `Nhà đẹp đến mức tôi không muốn làm phim nữa. LandHub phải nói là nền tảng mua bán bất động sản tuyệt vời nhất mà tôi từng trải nghiệm. Dễ dàng sử dụng, thông tin chi tiết và đội ngũ hỗ trợ khách hàng rất chuyên nghiệp. Tôi hoàn toàn tin tưởng và hài lòng với LandHub!`,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tr%E1%BA%A5n_Th%C3%A0nh_191226.png",
    name: "Trấn Thành",
    role: "Đạo diễn - Diễn viên - Nhà từ thiện - MC",
  },
  {
    message: `Ừ anh sai! Thì anh sai! Nhưng mà anh sai vì anh đã không biết đến LandHub sớm hơn! Đây thực sự là một cứu cánh cho tôi và đồng đội trong ban nhạc Ngọt. Với lịch trình bận rộn của chúng tôi, việc tìm kiếm một nơi ở đã trở nên dễ dàng hơn bao giờ hết nhờ vào LandHub. Giao diện dễ sử dụng, tính năng tìm kiếm linh hoạt và thông tin chi tiết về bất động sản đã giúp chúng tôi tiết kiệm thời gian và năng lượng.`,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSy1ITM85XGB06bZWO9PzGXc2Le8y2IvRFmrsPlxeMCg&s",
    name: "Thắng",
    role: "Ca sĩ - Nha sĩ",
  },
  {
    message: `Thay vì tốn 60 tỷ và 5 triệu tiền nuôi con thà mua mấy căn nhà của LandHub còn hơn. Dù cuộc sống có những thăng trầm và khó khăn, việc bỏ con là một quyết định không bao giờ dễ dàng. Tôi hiểu ai cũng cần một nơi để tìm kiếm sự hỗ trợ, đặc biệt trong lĩnh vực bất động sản, thì LandHub là một điểm đến tin cậy, dù là bạn đang tìm kiếm BĐS hoặc sự giúp đỡ trong các vấn đề giấy tờ.`,
    avatar:
      "https://images2.thanhnien.vn/zoom/686_429/Uploaded/haoph/2021_10_21/jack-va-thien-an-5805.jpeg",
    name: "Trịnh Trần Phương Tuấn (J97)",
    role: "Ca sĩ - Nhạc sĩ - Cầu thủ",
  },
];
