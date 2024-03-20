import { Avatar, Stack, Text, Box, useColorModeValue } from "@chakra-ui/react";
import Slider from "react-slick";
import CustomArrow from "../ui/CustomArrow";

const settings = {
  dots: true,
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
    <Slider {...settings} className="h-[450px] min-h-[450px]">
      {data.map((item, i) => (
        <Stack
          bg={bg}
          key={i}
          py={16}
          px={8}
          spacing={{ base: 8, md: 10 }}
          align={"center"}
          direction={"column"}
          maxH="400px"
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
    message: ` We had an incredible experience working with Chakra Templates and
  were impressed they made such a big difference in only three weeks.
  Our team is so grateful for the wonderful improvements they made and
  their ability to get familiar with the product concept so quickly.`,
    avatar:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    name: "Jenny Wilson",
    role: "Vice President",
  },
  {
    message: `Doraemon is a fictional character in the Japanese manga and anime series of the same name created by Fujiko F. Fujio. Doraemon is a male robotic earless cat that travels back in time from the 22nd century to aid a preteen boy named Nobita.`,
    avatar: "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg",
    name: "duy phan",
    role: "Vice President",
  },
  {
    message: `Bún chả Hương Liên là một món ăn ngon và đặc trưng của Việt Nam, và tôi có thể nhớ lại kỷ niệm thú vị khi thưởng thức món này tại Hà Nội trong chuyến thăm của mình vào năm 2016. Tôi có thể nhấn mạnh về ý nghĩa của việc thưởng thức ẩm thực và gặp gỡ văn hóa trong quá trình thăm đất nước bạn bè như Việt Nam.`,
    avatar:
      "https://cdn.britannica.com/43/172743-138-545C299D/overview-Barack-Obama.jpg?w=800&h=450&c=crop",
    name: "Barrack Obama",
    role: "Former US President",
  },
];
