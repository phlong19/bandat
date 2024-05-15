// libs
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import parse from "html-react-parser";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

// libs ui and ui
import {
  Box,
  Center,
  SimpleGrid,
  Tag,
  Spinner,
  Flex,
  Image,
  AspectRatio,
  Heading,
  VStack,
  UnorderedList,
  ListItem,
  Button,
  Text,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatArrow,
  useColorModeValue,
  useDisclosure,
  AccordionPanel,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoBackButton from "../ui/GoBackButton";
import RelatedPosts from "../ui/RelatedPosts";
import DetailsFeature from "../ui/DetailsFeature";
import Disclaimer from "../ui/Disclaimer";
import StickyAuthorBox from "../ui/StickyAuthorBox";
import CustomArrow from "../ui/CustomArrow";
import DetailsMediasModal from "../ui/DetailsMediasModal";

// icons
import { GrMoney } from "react-icons/gr";
import { PiArmchair, PiFrameCornersLight, PiImagesFill } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { TbBed, TbRoad, TbStack2 } from "react-icons/tb";
import { LiaBathSolid } from "react-icons/lia";
import { RiCompass3Line } from "react-icons/ri";
import { CiRuler } from "react-icons/ci";
import { FiPlayCircle } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { FaRuler } from "react-icons/fa6";

// vars, ctx, hooks, ...
import { useAuth } from "../context/UserContext";
import {
  getRelatedPosts,
  getRelatedPostsAuthor,
  getSinglePost,
} from "../services/apiRE";
import { m2 } from "../constants/anyVariables";
import { formatCurrency, formatDate } from "../utils/helper";
import { error } from "../constants/message";

function Details() {
  const accent = useColorModeValue("primary", "secondary");
  const border = useColorModeValue("gray.300", "whiteAlpha.700");
  const desColor = useColorModeValue("dark", "whiteAlpha.800");
  const darklight = useColorModeValue("dark", "light");
  const revert = useColorModeValue("white", "black");

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // hooks
  const { isLoading } = useAuth();
  const mapRef = useRef(null);
  const { land } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const { data: post, isLoading: isFetching } = useQuery({
    queryKey: ["SinglePost", land],
    queryFn: () => getSinglePost(land),
    enabled: Boolean(land),
  });

  // change page title
  useEffect(() => {
    if (post) {
      document.title = "LandHub - " + post.name;
    }
  }, [post]);

  // api get related post on address
  const { data: relatedPosts, isLoading: isQuerying } = useQuery({
    queryKey: ["related-posts", land],
    queryFn: () =>
      getRelatedPosts({
        cityID: post.cityID,
        disID: post.disID,
        wardID: post.wardID,
        postID: post.id,
      }),
    enabled:
      Boolean(post?.id) &&
      Boolean(post?.cityID) &&
      Boolean(post?.disID) &&
      Boolean(post?.wardID),
  });

  // api get related post on author
  const { data, isLoading: isAuthoring } = useQuery({
    queryKey: ["related-author-posts", land],
    queryFn: () => getRelatedPostsAuthor(post?.id, post?.userID),
    enabled: Boolean(post?.id) && Boolean(post?.userID),
  });

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner speed="0.35s" size="md" />
      </Center>
    );
  }

  if (!post?.id) {
    toast.error(error.cantFindPost);
    return navigate("/");
  }

  const {
    id,
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
    docs,
    lat,
    long,
    created_at,
    facade,
    entryLength,
    floor,
    des,
    fur,
    type,
    price,
    purType,
    profile,
  } = post;

  const videos = medias.filter((media) => media.isImage === false);
  const images = medias.filter(
    (media) => media.isImage === true && media.is360Image === false,
  );
  const image360 = medias.filter((media) => media.is360Image === true);
  // for reduce bug threat when medias array fetched has unknown order about the file type
  const newMedia = [...image360, ...videos, ...images];

  const settings = {
    customPaging: function (i) {
      const isImg = newMedia[i].isImage;

      return (
        <a>
          {!isImg ? (
            <Box
              id="video-thumbnail"
              bg={darklight}
              boxSize="40px"
              color={revert}
            >
              <FiPlayCircle fontSize={18} />
            </Box>
          ) : (
            <Image
              boxSize="40px"
              filter="grayscale(1)"
              src={newMedia[i]?.mediaLink}
            />
          )}
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    draggable: image360.length === 0, // if has img 360 => no drag
    initialSlide: index > 0 ? index : 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };

  function handleOpen(e) {
    const i = newMedia.findIndex((media) => media.id === Number(e.target.id));
    setIndex(i);
    onOpen();
  }

  return (
    <Box maxW="1500px" mx="auto" p={3} px={{ base: 2, md: 4, xl: 5 }}>
      <Flex justify="space-between" align="center" pb={2}>
        <GoBackButton />
        <Flex gap={2}>
          <Tag
            variant="outline"
            colorScheme="green"
            fontSize={{ base: "xs", md: "sm" }}
          >
            {purType ? "Bán" : "Cho thuê"}
          </Tag>
          <Tag
            variant="outline"
            colorScheme="green"
            fontSize={{ base: "xs", md: "sm" }}
          >
            {type.name}
          </Tag>
        </Flex>
      </Flex>

      {/* media section */}
      <Box mb={3.5} minH={400}>
        {isMobile ? (
          <Slider {...settings} className="slider-mobile">
            {image360.length > 0 && (
              <AspectRatio w="full">
                <ReactPhotoSphereViewer
                  touchmoveTwoFingers
                  loadingTxt="Đang tải"
                  src={image360[0]?.mediaLink}
                  width="100%"
                />
              </AspectRatio>
            )}
            {videos.map((media) => (
              <AspectRatio key={media.id}>
                <video src={media?.mediaLink} controls />
              </AspectRatio>
            ))}
            {images.map((media) => (
              <AspectRatio key={media.id} ratio={4 / 3} w="full">
                <Image src={media?.mediaLink} objectFit="contain" />
              </AspectRatio>
            ))}
          </Slider>
        ) : (
          <Flex h={400} w="full" justifyContent="center" gap={1}>
            {/* first 360 img or video or normal img */}
            <Flex w="50%" h="full">
              {image360.length > 0 ? (
                <AspectRatio ratio={16 / 9} w="full" _before="none">
                  <ReactPhotoSphereViewer
                    src={image360[0]?.mediaLink}
                    width="100%"
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9} w="full" _before="none">
                  {videos.length > 0 ? (
                    <video
                      className="rounded-l-lg"
                      src={videos[0]?.mediaLink}
                      controls
                    />
                  ) : (
                    <Button
                      variant="unstyled"
                      onClick={(e) => handleOpen(e)}
                      rounded="none"
                    >
                      <Image
                        id={images[0]?.id}
                        roundedLeft="lg"
                        src={images[0]?.mediaLink}
                      />
                    </Button>
                  )}
                </AspectRatio>
              )}
            </Flex>
            {/* others */}
            <SimpleGrid
              spacing={0.5}
              columns={2}
              w="50%"
              templateRows="repeat(2, 1fr)"
              h="100%"
            >
              {/* no matter post have 360 image or not, just display one video at the first grid place with 3 other normal images */}
              {videos.length > 1 ? (
                <>
                  <AspectRatio _before="none">
                    <video src={videos[1]?.mediaLink} controls />
                  </AspectRatio>
                  {images.slice(0, 2).map((media, i) => (
                    <AspectRatio key={media?.id} _before="none">
                      <Button
                        variant="unstyled"
                        onClick={(e) => handleOpen(e)}
                        rounded="none"
                      >
                        <Image
                          id={media?.id}
                          src={media?.mediaLink}
                          borderTopRightRadius={i === 0 ? "lg" : "none"}
                        />
                      </Button>
                    </AspectRatio>
                  ))}
                </>
              ) : (
                // or else diplay 4 images
                // first 3
                images.slice(1, 4).map((media, i) => (
                  <AspectRatio key={media?.id} _before="none">
                    <Button
                      variant="unstyled"
                      onClick={(e) => handleOpen(e)}
                      rounded="none"
                    >
                      <Image
                        id={media?.id}
                        src={media?.mediaLink}
                        borderTopRightRadius={i === 1 ? "lg" : "none"}
                      />
                    </Button>
                  </AspectRatio>
                ))
              )}
              {/* if has more imgs, overlay or else just display the final image as normal */}
              {newMedia.length <= 5 ? (
                <AspectRatio _before="none">
                  <Button
                    variant="unstyled"
                    onClick={(e) => handleOpen(e)}
                    rounded="none"
                  >
                    <Image
                      id={images[4]?.id}
                      src={images[4]?.mediaLink}
                      borderBottomRightRadius="lg"
                    />
                  </Button>
                </AspectRatio>
              ) : (
                <AspectRatio _before="none">
                  <Button
                    variant="unstyled"
                    onClick={(e) => handleOpen(e)}
                    rounded="none"
                    borderBottomRightRadius="lg"
                  >
                    <Image
                      src={images[4]?.mediaLink}
                      id={images[4]?.id}
                      filter="grayscale(1)"
                    />
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      bg="blackAlpha.500"
                      w="full"
                      h="full"
                    >
                      <Text
                        fontSize="lg"
                        color="white"
                        display="flex"
                        gap={1.5}
                        alignItems="center"
                        justifyContent="center"
                        h="full"
                      >
                        +{newMedia.length - 5} <PiImagesFill fontSize={25} />
                      </Text>
                    </Box>
                  </Button>
                </AspectRatio>
              )}
            </SimpleGrid>
          </Flex>
        )}
        {/* modal medias */}
        <DetailsMediasModal
          image360={image360}
          isOpen={isOpen}
          newMedia={newMedia}
          onClose={onClose}
          settings={settings}
        />
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
          <Box maxW={{ base: "full", lg: "78%" }}>
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
                gridTemplateRows={bath_room && bed_room ? "repeat(2, 1fr)" : ""}
                gridGap={1}
              >
                <Stat mr={{ base: 0.5, md: 2.5, lg: 3 }}>
                  <StatLabel>Giá trị</StatLabel>
                  <StatNumber color={accent}>
                    {formatCurrency(price)}
                  </StatNumber>

                  <StatHelpText>
                    <StatArrow as={GrMoney} type="increase" />
                    {purType
                      ? `${formatCurrency(price / area)}/${m2}`
                      : "/ tháng"}
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Diện tích</StatLabel>
                  <StatNumber color={accent}>
                    {area} {m2}
                  </StatNumber>

                  {facade && (
                    <StatHelpText>
                      <StatArrow as={FaRuler} type="increase" />
                      Mặt tiền {facade}m
                    </StatHelpText>
                  )}
                </Stat>
                {bed_room > 0 && (
                  <Stat>
                    <StatLabel>Phòng ngủ</StatLabel>
                    <StatNumber color={accent}>{bed_room} PN</StatNumber>
                  </Stat>
                )}
                {bath_room > 0 && (
                  <Stat>
                    <StatLabel>Phòng tắm</StatLabel>
                    <StatNumber color={accent}>{bath_room} PT</StatNumber>
                  </Stat>
                )}
              </StatGroup>
            </Box>
            {/* des */}
            <Box pb={1}>
              <Heading fontSize="lg" color={accent}>
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
              <Heading fontSize="lg" color={accent}>
                Đặc điểm bất động sản
              </Heading>
              <Flex
                gap={{ base: 2, sm: 3, md: 4, xl: 5 }}
                flexDir={{ base: "column", md: "row" }}
                p={1.5}
                fontSize="sm"
              >
                {/* first col */}
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
                    value={bed_room + " phòng"}
                  />
                  <DetailsFeature
                    icon={PiArmchair}
                    label="Nội thất"
                    value={fur ? "Có sẵn" : "Không"}
                  />
                </VStack>
                {/* second col */}
                <VStack w={{ base: "100%", md: "50%" }}>
                  <DetailsFeature
                    value={bath_room + " phòng"}
                    label="Số toilet"
                    icon={LiaBathSolid}
                  />
                  {floor && (
                    <DetailsFeature
                      icon={TbStack2}
                      label="Số tầng"
                      value={floor + " tầng"}
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
                  <DetailsFeature doc icon={CgFileDocument}>
                    <Accordion w="full" allowToggle>
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton pr="1">
                            <Box
                              as="span"
                              fontSize="sm"
                              flex="1"
                              textAlign="left"
                            >
                              Giấy tờ pháp lý
                            </Box>
                            <AccordionIcon color={accent} />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <UnorderedList>
                            {docs.map((doc) => (
                              <ListItem key={doc.id}>
                                {doc.docName.doc_name}
                              </ListItem>
                            ))}
                          </UnorderedList>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </DetailsFeature>
                </VStack>
              </Flex>
            </Box>
            {/* location */}
            <Box>
              <Heading fontSize="lg" color={accent}>
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

            {/* related posts */}
            <Box px={1}>
              <Heading fontSize="lg" color={accent}>
                Bài đăng liên quan cùng khu vực
              </Heading>
              <RelatedPosts data={relatedPosts} isLoading={isQuerying} />
            </Box>

            {/* related author posts */}
            <Box px={1}>
              <Heading fontSize="lg" color={accent}>
                Bài đăng cùng tác giả
              </Heading>
              <RelatedPosts
                data={data}
                isLoading={isAuthoring}
                author={false}
              />
            </Box>

            {/* dates */}
            <Box my={2}>
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
                <Box ml={{ base: 0, md: 10, xl: 12 }}>
                  <Text color="gray.400">Mã tin đăng</Text>
                  <Text>{id}</Text>
                </Box>
              </Flex>
            </Box>

            {/* disclaimer */}
            {!isMobile && <Disclaimer name={name} />}
          </Box>
          {/* sticky post author */}
          <StickyAuthorBox author={profile} postID={id} />
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
