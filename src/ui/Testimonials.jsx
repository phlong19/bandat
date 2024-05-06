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
          py={16}
          px={8}
          spacing={{ base: 8, md: 10 }}
          align={"center"}
          direction={"column"}
          maxH={{ base: 500, md: 450 }}
          minH={{ base: 500, md: 450 }}
          h={{ base: 500, md: 450 }}
          display="flex"
        >
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
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
    message: `Nhà đẹp đến mức tôi không muốn làm phim nữa`,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tr%E1%BA%A5n_Th%C3%A0nh_191226.png",
    name: "Trấn Thành",
    role: "Đạo diễn - Diễn viên - Nhà từ thiện - MC",
  },
  {
    message: `Ừ anh sai! Thì anh sai! Nhưng mà anh sai vì anh đã không biết đến LandHub sớm hơn`,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSy1ITM85XGB06bZWO9PzGXc2Le8y2IvRFmrsPlxeMCg&s",
    name: "Thắng",
    role: "Ca sĩ",
  },
  {
    message: `Thay vì tốn 60 tỷ và 5 triệu tiền nuôi con thà mua mấy căn nhà của LandHub còn hơn`,
    avatar:
      "https://images2.thanhnien.vn/zoom/686_429/Uploaded/haoph/2021_10_21/jack-va-thien-an-5805.jpeg",
    name: "Trịnh Trần Phương Tuấn (J97)",
    role: "Ca sĩ - Nhạc sĩ - Cầu thủ",
  },
];
