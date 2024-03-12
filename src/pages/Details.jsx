// libs
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import parse from "html-react-parser";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";

// libs ui and ui
import {
  Box,
  Center,
  Button,
  Tag,
  Spinner,
  Flex,
  Grid,
  Image,
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
import DetailsFeature from "../ui/DetailsFeature";
import Disclaimer from "../ui/Disclaimer";

// icons
import { GrMoney } from "react-icons/gr";
import { PiFrameCornersLight } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { TbBed, TbRoad, TbStack2 } from "react-icons/tb";
import { LiaBathSolid } from "react-icons/lia";
import { RiCompass3Line } from "react-icons/ri";
import { CiRuler } from "react-icons/ci";

// vars, ctx, hooks, ...
import { useAuth } from "../context/UserContext";
import { getSinglePost } from "../services/apiRE";
import { m2 } from "../constants/anyVariables";
import { formatCurrency, formatDate } from "../utils/helper";
import StickyAuthorBox from "../ui/StickyAuthorBox";

function Details() {
  const accent = useColorModeValue("primary", "secondary");
  const border = useColorModeValue("gray.200", "whiteAlpha.700");
  const desColor = useColorModeValue("dark", "whiteAlpha.800");

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // hooks
  const { isLoading } = useAuth();
  const mapRef = useRef(null);
  const { land } = useParams();

  const { data: post, isLoading: isFetching } = useQuery({
    queryKey: ["SinglePost", land],
    queryFn: () => getSinglePost(land),
    enabled: Boolean(land),
  });

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner speed="0.35s" size="md" />
      </Center>
    );
  }

  const {
    medias,
    expriryDate,
    name,
    bed_room,
    bath_room,
    direction,
    city: { cityName },
    dis: { disName },
    ward: { wardName },
    address,
    area,
    lat,
    long,
    created_at,
    facade,
    entryLength,
    floor,
    des,
    type,
    price,
    purType,
    profile: dev,
  } = post;

  const profile = { ...dev, phone: `236346346` };

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
        <Flex gap={2}>
          <Tag variant="outline" colorScheme="green">
            {purType ? "Bán" : "Cho thuê"}
          </Tag>
          <Tag variant="outline" colorScheme="green">
            {type.name}
          </Tag>
        </Flex>
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
          gap={{ base: 2, lg: 4, xl: 5 }}
          display={{ base: "block", lg: "flex" }}
          px={{ base: 1, md: 1.5 }}
          justifyContent="space-around"
        >
          {/* infs */}
          <Box>
            <Heading fontSize="3xl" fontWeight="600">
              {name}
            </Heading>
            <Text
              my={2}
              opacity={0.9}
            >{`${address}, ${wardName}, ${disName}, ${cityName}`}</Text>
            {/* stats */}
            <Box borderY="1px solid var(--chakra-colors-gray-200)" p={2} my={3}>
              <StatGroup
                display={{ base: "grid", md: "flex" }}
                gridTemplateColumns="repeat(2, 1fr)"
                gridTemplateRows="repeat(2, 1fr)"
                gridGap={1}
              >
                <Stat mr={{ base: 0.5, md: 2.5, lg: 3 }}>
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
            <Box pb={1}>
              <Heading fontSize="xl" color={accent}>
                Thông tin mô tả
              </Heading>
              <Box h={200} fontSize="sm" height="fit-content">
                <Box color={desColor} p={1.5}>
                  {parse(des)}
                </Box>
              </Box>
            </Box>
            {/* features */}
            <Box my={3}>
              <Heading fontSize="xl" color={accent}>
                Đặc điểm bất động sản
              </Heading>
              <Flex
                gap={{ base: 2, sm: 3, md: 4, xl: 5 }}
                flexDir={{ base: "column", md: "row" }}
                p={1.5}
                fontSize="sm"
              >
                {/* first 4 */}
                <VStack w={{ base: "100%", md: "50%" }}>
                  <DetailsFeature
                    value={area + " " + m2}
                    label="Diện tích"
                    icon={PiFrameCornersLight}
                  />
                  <DetailsFeature
                    value={formatCurrency(price) + `${purType ? "" : "/tháng"}`}
                    label="Mức giá"
                    icon={BsCashCoin}
                  />
                  <DetailsFeature
                    icon={RiCompass3Line}
                    label="Hướng nhà"
                    value={direction}
                  />
                  <DetailsFeature
                    icon={TbBed}
                    label="Số phòng ngủ"
                    value={bed_room}
                  />
                </VStack>
                {/* last 4 */}
                <VStack w={{ base: "100%", md: "50%" }}>
                  <DetailsFeature
                    value={bath_room}
                    label="Số toilet"
                    icon={LiaBathSolid}
                  />
                  {floor && (
                    <DetailsFeature
                      icon={TbStack2}
                      label="Số tầng"
                      value={floor}
                    />
                  )}
                  {facade && (
                    <DetailsFeature
                      value={facade + " m"}
                      label="Mặt tiền"
                      icon={CiRuler}
                    />
                  )}
                  {entryLength && (
                    <DetailsFeature
                      icon={TbRoad}
                      label="Đường vào"
                      value={entryLength + " m"}
                    />
                  )}
                </VStack>
              </Flex>
            </Box>
            {/* location */}
            <Box>
              <Heading fontSize="xl" color={accent}>
                Xem trên bản đồ
              </Heading>
              <MapContainer
                className="my-3.5 min-h-80 max-w-[1200px] rounded-md"
                center={[lat, long]}
                zoom={14}
                ref={mapRef}
                scrollWheelZoom={true}
                whenReady={() => resizeMap(mapRef)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, long]} icon={marker}></Marker>
              </MapContainer>
            </Box>
            {/* dates */}
            <Box>
              <Flex
                py={1.5}
                borderY="1px solid transparent"
                borderColor={border}
                gap={{ base: 10 }}
              >
                <Box>
                  <Text color="gray.400">Tin đăng ngày</Text>
                  <Text>{formatDate(created_at)}</Text>
                </Box>
                <Box ml={{ base: 0, md: 10, xl: 12 }}>
                  <Text color="gray.400">Ngày hết hạn</Text>
                  <Text>{formatDate(expriryDate)}</Text>
                </Box>
              </Flex>
            </Box>

            {/* disclaimer */}
            {!isMobile && <Disclaimer name={name} />}
          </Box>
          {/* sticky post author */}
          <StickyAuthorBox author={profile} />
        </Flex>
      </Box>
      {isMobile && <Disclaimer name={name} />}
    </Box>
  );
}

export default Details;

const marker = new L.Icon({
  iconUrl: "/customMarker.png",
  iconSize: [30, 30],
});

function resizeMap(mapRef) {
  const resizeObserver = new ResizeObserver(() =>
    mapRef.current?.invalidateSize(),
  );
  const container = document.getElementById("map-container");
  if (container) {
    resizeObserver.observe(container);
  }
}

// let fake = {
//   id: 70,
//   expriryDate: "2024-03-26T07:36:59.965453+00:00",
//   created_at: "2024-03-09T07:36:59.965453+00:00",
//   purType: true,
//   REType_ID: 1,
//   address: "Phố Hoàng Hoa Thám",
//   area: 45,
//   price: 8450000000,
//   fur: true,
//   bed_room: 5,
//   bath_room: 4,
//   floor: 5,
//   userID: "e292b030-456a-4044-90a9-5610fe5f3971",
//   name: "Bán nhà phố Hoàng Hoa Thám 45m2, 5 tầng ô tô 4 chỗ đỗ cửa ",
//   des: "<p>Phân lô, ôtô, phố víp, nhà đẹp, gần phố, nội thất biếu không.</p><p><br></p><p>+ Nhà dân xây rất trắc chắn kiên cố, cả ngõ có 16 nhà, rất hiếm nhà bán.</p><p><br></p><p>+ Ngõ rộng đều 3m, cách phố đúng 30m, hàng xóm văn minh, dân trí cao.</p><p><br></p><p>+ Gần chợ Bưởi, vài bước ra Hồ Tây, cạnh sưởng phim, gần bệnh viện Phổi, viện 354, giao thông đi lại rất thuận tiện.</p><p>+ Nhà thiết kế rất đẹp, kiên cố.</p><p><br></p><p>+ Tầng 1 để xe, bếp, vệ sinh.</p><p>+ Tầng 2 phòng khách + 1 ngủ, vệ sinh.</p><p>+ Tầng 3 có 2 phòng ngủ vệ sinh giữa.</p><p>+ Tầng 4 phòng thờ và 1 ngủ.</p><p>+ Tầng 5 phòng thờ sân phơi.</p><p>+ Sổ đỏ vuông đét, giao dịch ngay.</p>",
//   direction: "Bắc",
//   facade: 5,
//   entryLength: null,
//   report: 0,
//   lat: 21.03958,
//   long: 105.82835,
//   cityID: 1,
//   disID: 1,
//   wardID: 4,
//   status: 2,
//   slug: "ban-nha-pho-hoang-hoa-tham-45m2-5-tang-o-to-4-cho-do-cua",
//   city: {
//     cityName: " Hà Nội",
//   },
//   dis: {
//     disName: "Quận Ba Đình",
//   },
//   ward: {
//     wardName: "Phường Cống Vị",
//   },
//   medias: [
//     {
//       id: 328,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - dc67150b-8257-4928-833c-d2a8a8e3b7fb70",
//     },
//     {
//       id: 329,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - d7d85096-d29e-4e74-892a-e7b3b38f6fd370",
//     },
//     {
//       id: 330,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - 4aec8dd3-19a2-4996-8254-556dffc7c42770",
//     },
//     {
//       id: 331,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - 05fc3314-c9b2-4313-9725-11d2f42fe29970",
//     },
//     {
//       id: 332,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - f537e687-777f-4ad8-887e-645bdde289d470",
//     },
//     {
//       id: 333,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - af50c474-1ec7-4de8-8fed-20f896fd4c9170",
//     },
//     {
//       id: 334,
//       isImage: true,
//       mediaLink:
//         "https://aoxsfgokuqsahcxscxqt.supabase.co/storage/v1/object/public/medias/REDir - fb1b7149-8541-4428-af7f-1494c2e40ffe70",
//     },
//   ],
//   docs: [
//     {
//       id: 95,
//       docName: {
//         doc_id: 2,
//         doc_name: "Sổ hồng",
//       },
//     },
//     {
//       id: 96,
//       docName: {
//         doc_id: 5,
//         doc_name: "Sổ đỏ",
//       },
//     },
//   ],
//   profile: {
//     phone: 987513549,
//     avatar: null,
//     fullName: "Nhà đất Hà Nội",
//     email: "test@gmail.com",
//   },
//   type: {
//     type: "nha-rieng",
//   },
// };
