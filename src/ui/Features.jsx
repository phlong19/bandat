import {
  Stack,
  Box,
  Container,
  SimpleGrid,
  Heading,
  Icon,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbRouter } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { BsCardChecklist, BsSpeedometer2 } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { MdChatBubbleOutline } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";

const features = [
  {
    id: 1,
    icon: FaMapMarkerAlt, // Font Awesome icon
    title: "Xem trên bản đồ",
    text: "Dễ dàng xem vị trí của bất động sản trên bản đồ để có cái nhìn toàn cảnh và định vị chính xác.",
  },
  {
    id: 2,
    icon: TbRouter, // Game-icons.net icon
    title: "Giao diện thân thiện và định tuyến",
    text: "Giao diện thân thiện với người dùng và có hệ thống xây dựng hiệu quả, giúp người dùng dễ dàng điều hướng trong ứng dụng.",
  },
  // Add more features here
  {
    id: 3,
    icon: FiHome, // Feather icon
    title: "Tìm kiếm nhà và bất động sản",
    text: "Tìm kiếm và khám phá các loại bất động sản từ nhà ở, căn hộ đến khu đất nền, đáp ứng mọi nhu cầu của bạn.",
  },
  {
    id: 4,
    icon: IoMdPeople, // Ionicons icon
    title: "Cộng đồng LandHub",
    text: "Tham gia vào cộng đồng LandHub, chia sẻ kiến thức, kinh nghiệm và nhận được sự hỗ trợ từ cộng đồng trong quá trình tìm kiếm và giao dịch bất động sản.",
  },
  {
    id: 5,
    icon: BsCardChecklist, // Bootstrap Icons icon
    title: "Quản lý danh sách yêu thích",
    text: "Lưu trữ các bất động sản yêu thích của bạn vào danh sách để dễ dàng theo dõi và so sánh sau này.",
  },
  {
    id: 6,
    icon: MdChatBubbleOutline, // Material Design icon
    title: "Hỗ trợ trực tuyến",
    text: "Nhận sự hỗ trợ và tư vấn trực tuyến từ đội ngũ hỗ trợ khách hàng của chúng tôi mọi lúc, mọi nơi.",
  },
  {
    id: 7,
    icon: RiShieldUserFill, // Remix Icon icon
    title: "Bảo mật thông tin cá nhân",
    text: "LandHub cam kết bảo vệ thông tin cá nhân của bạn và tuân thủ các quy định về bảo mật dữ liệu.",
  },
  {
    id: 8,
    icon: BsSpeedometer2, // Simple Icons icon
    title: "Hiệu suất cao và ổn định",
    text: "Sử dụng công nghệ hiện đại giúp LandHub hoạt động mượt mà và ổn định, mang lại trải nghiệm người dùng tốt nhất.",
  },
];

const container = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemChildren = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1,
    },
  },
};

function Features() {
  const color = useColorModeValue("gray.600", "gray.400");
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"} mt={3}>
          Tính năng
        </Heading>
        <Text color={color} fontSize={"xl"}>
          Tính năng tốt mang lại nhiều giá trị cho sản phẩm và dịch vụ, tăng
          cường tính sử dụng, nâng cao sức hấp dẫn chung cho người dùng.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={10}
          as={motion.div}
          variants={container}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          {features.map((feature) => (
            <HStack
              key={feature.id}
              align={"top"}
              as={motion.div}
              variants={itemChildren}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={feature.icon} fontSize="lg" />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={color}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Features;
