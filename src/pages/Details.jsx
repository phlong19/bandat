// libs
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import parse from "html-react-parser";
import { toast } from "react-hot-toast";

// libs ui and ui
import {
  Box,
  Center,
  Button,
  Spinner,
  Flex,Grid,
  Image,
  Link as ChakraLink,
  AspectRatio,
  Heading,
  VStack,
  HStack,
  Text,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatArrow,
  useColorModeValue,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoBackButton from "../ui/GoBackButton";
import Avatar from "../ui/Avatar";

// icons
import { GrMoney } from "react-icons/gr";

// vars, ctx, hooks, ...
import { useAuth } from "../context/UserContext";
import { getSinglePost } from "../services/apiRE";
import { m2 } from "../constants/anyVariables";
import { formatCurrency } from "../utils/helper";
import { success } from "../constants/message";

function Details() {
  const accent = useColorModeValue("primary", "secondary");
  const wb = useColorModeValue("light", "darker");
  const border = useColorModeValue("gray.200", "gray.500");
  const desColor = useColorModeValue("dark", "whiteAlpha.800");
  const { isLoading } = useAuth();

  const { land } = useParams();
  const { data: post, isLoading: isFetching } = useQuery({
    queryKey: ["SinglePost"],
    queryFn: () => getSinglePost(land),
    enabled: false,
  });

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner speed="0.3s" />
      </Center>
    );
  }

  let fake = {
    id: 70,
    created_at: "2024-03-09T07:36:59.965453+00:00",
    purType: true,
    REType_ID: 1,
    address: "Phố Hoàng Hoa Thám",
    area: 45,
    price: 8450000000,
    fur: true,
    bed_room: 5,
    bath_room: 4,
    floor: 5,
    userID: "e292b030-456a-4044-90a9-5610fe5f3971",
    name: "Bán nhà phố Hoàng Hoa Thám 45m2, 5 tầng ô tô 4 chỗ đỗ cửa ",
    des: "<p>Phân lô, ôtô, phố víp, nhà đẹp, gần phố, nội thất biếu không.</p><p><br></p><p>+ Nhà dân xây rất trắc chắn kiên cố, cả ngõ có 16 nhà, rất hiếm nhà bán.</p><p><br></p><p>+ Ngõ rộng đều 3m, cách phố đúng 30m, hàng xóm văn minh, dân trí cao.</p><p><br></p><p>+ Gần chợ Bưởi, vài bước ra Hồ Tây, cạnh sưởng phim, gần bệnh viện Phổi, viện 354, giao thông đi lại rất thuận tiện.</p><p>+ Nhà thiết kế rất đẹp, kiên cố.</p><p><br></p><p>+ Tầng 1 để xe, bếp, vệ sinh.</p><p>+ Tầng 2 phòng khách + 1 ngủ, vệ sinh.</p><p>+ Tầng 3 có 2 phòng ngủ vệ sinh giữa.</p><p>+ Tầng 4 phòng thờ và 1 ngủ.</p><p>+ Tầng 5 phòng thờ sân phơi.</p><p>+ Sổ đỏ vuông đét, giao dịch ngay.</p>",
    direction: "Bắc",
    facade: 5,
    entryLength: null,
    report: 0,
    lat: 21.03958,
    long: 105.82835,
    cityID: 1,
    disID: 1,
    wardID: 4,
    status: 2,
    slug: "ban-nha-pho-hoang-hoa-tham-45m2-5-tang-o-to-4-cho-do-cua",
    city: {
      cityName: " Hà Nội",
    },
    dis: {
      disName: "Quận Ba Đình",
    },
    ward: {
      wardName: "Phường Cống Vị",
    },
    medias: [
      {
        id: 328,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - dc67150b-8257-4928-833c-d2a8a8e3b7fb70",
      },
      {
        id: 329,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - d7d85096-d29e-4e74-892a-e7b3b38f6fd370",
      },
      {
        id: 330,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - 4aec8dd3-19a2-4996-8254-556dffc7c42770",
      },
      {
        id: 331,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - 05fc3314-c9b2-4313-9725-11d2f42fe29970",
      },
      {
        id: 332,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - f537e687-777f-4ad8-887e-645bdde289d470",
      },
      {
        id: 333,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - af50c474-1ec7-4de8-8fed-20f896fd4c9170",
      },
      {
        id: 334,
        isImage: true,
        mediaLink:
          "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - fb1b7149-8541-4428-af7f-1494c2e40ffe70",
      },
    ],
    docs: [
      {
        id: 95,
        docName: {
          doc_id: 2,
          doc_name: "Sổ hồng",
        },
      },
      {
        id: 96,
        docName: {
          doc_id: 5,
          doc_name: "Sổ đỏ",
        },
      },
    ],
    profile: {
      phone: 987513549,
      avatar: null,
      fullName: "Nhà đất Hà Nội",
      email: "test@gmail.com",
    },
    statusRE: {
      id: 2,
      status: "Đã duyệt",
      created_at: "2024-01-28T14:44:07.888227+00:00",
    },
    type: {
      type: "nha-rieng",
    },
  };

  const {
    medias,
    name,
    bed_room,
    bath_room,
    city: { cityName },
    dis: { disName },
    ward: { wardName },
    address,
    area,
    created_at,
    des,
    type,
    price,
    purType,
    profile: { email, fullName, phone, avatar },
  } = fake;
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={medias[i].mediaLink} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box maxW="1500px" mx="auto" p={3} px={5}>
      <Flex justify="space-between" align="center">
        <GoBackButton />
        <p>share buttons</p>
      </Flex>

      <Box my={3} bg="green.700" h={400}>
        {/* media section */}
        {/* <Slider {...settings}>
          {medias.map((media) =>
            media.isImage ? (
              <Image rounded='lg' src={media.mediaLink} key={media.id}  />
            ) : (
              <AspectRatio key={media.id}>
                <video src={media.mediaLink}></video>
              </AspectRatio>
            ),
          )}
        </Slider> */}
      </Box>
      {/* main content */}
      <Box>
        <Flex
          gap={{ base: 2, lg: 3, xl: 4 }}
          display={{ base: "block", lg: "flex" }}
          px={{ base: 1, md: 1.5 }}
        >
          {/* infs */}
          <Box>
            <Heading fontSize="2xl" fontWeight="600">
              {name}
            </Heading>
            {/* stats */}
            <Box borderY="1px solid var(--chakra-colors-gray-200)" p={2} my={3}>
              <StatGroup
                display={{ base: "grid", md: "flex" }}
                gridTemplateColumns="repeat(2, 1fr)"
                gridTemplateRows="repeat(2, 1fr)"
                gridGap={1}
              >
                <Stat mr={{ base: 0.5, md: 2.5, lg: 4 }}>
                  <StatLabel>Giá trị</StatLabel>
                  <StatNumber color={accent}>
                    {formatCurrency(price)}
                  </StatNumber>
                  {purType && (
                    <StatHelpText>
                      <StatArrow as={GrMoney} type="increase" />
                      {formatCurrency(price / area)}/{m2}
                    </StatHelpText>
                  )}
                </Stat>
                <Stat>
                  <StatLabel>Diện tích</StatLabel>
                  <StatNumber color={accent}>
                    {area} {m2}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Phòng ngủ</StatLabel>
                  <StatNumber color={accent}>{bed_room} PN</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Phòng tắm</StatLabel>
                  <StatNumber color={accent}>{bath_room} PT</StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            {/* des */}
            <Box
              h={200}
              fontSize="sm"
              height="fit-content"
              p={{ base: 2, lg: 2.5 }}
            >
              <Heading fontSize="xl" pb={3} fontWeight="600">
                Thông tin mô tả
              </Heading>
              <Box color={desColor}>{parse(des)}</Box>
            </Box>
            {/* features */}
            <Heading fontSize="xl">Đặc điểm bất động sản</Heading>
            <Grid templateColumns={{base:2,md:4}} templateRows={{base:2,md:4}}>
              hi
            </Grid>
          </Box>
          {/* sticky post author */}
          <Box
            position={{ base: "relative", lg: "sticky" }}
            top={20}
            w={{ base: "full", lg: "30%" }}
            border="1px solid transparent"
            borderColor={border}
            rounded="md"
            p={2} mt={1}
            pos="sticky"
            h={{ base: "fit-content", md: "100%" }}
          >
            <Center flexDir="column">
              <Avatar avatar={avatar} fullName={fullName} mobile />
              <Text size="xs" color="gray.400" pt={3} fontFamily="roboto">
                Được đăng bởi
              </Text>
              <Text>{fullName}</Text>
              <VStack gap={2} my={2} w="50%">
                <Button
                  bg={accent}
                  color={wb}
                  w="full"
                  size="sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(`0${phone}`);
                    toast.success(success.copyToClipboard);
                  }}
                >
                  0{phone}
                </Button>
                {/* zalo chat */}
                <Button
                  size="sm"
                  w="full"
                  variant="outline"
                  fontWeight={500}
                  as={ChakraLink} target="_blank"
                  href={`https://chat.zalo.me/?phone=0${phone}`}
                >
                  Chat qua Zalo
                </Button>
                {/* email */}
                <Button
                  size="sm"
                  w="full"
                  variant="outline"
                  fontWeight={500}
                  as={ChakraLink}
                  href={`mailto:${email}`}
                >
                  Gửi email
                </Button>
              </VStack>
            </Center>
          </Box>
        </Flex>
      </Box>

      {/* location */}
    </Box>
  );
}

export default Details;
