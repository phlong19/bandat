// libs
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import parse from "html-react-parser";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  Button,
  Text,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useDisclosure,
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
import { getRelatedPosts } from "../services/apiRE";
import { formatCurrency } from "../utils/helper";
import { error } from "../constants/message";
import { getProduct } from "../services/apiProduct";
import { Helmet } from "react-helmet-async";

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
  const { slug } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const { data: product, isLoading: isFetching } = useQuery({
    queryKey: ["product-details", slug],
    queryFn: () => getProduct(slug!),
    enabled: Boolean(slug),
  });

  // api get related post on address
  const { data: relatedPosts, isLoading: isQuerying } = useQuery({
    queryKey: ["related-products", slug],
    queryFn: () => {},
    enabled: false,
  });

  if (isLoading || isFetching) {
    return (
      <Center minH="80dvh">
        <Spinner speed="0.35s" size="md" />
      </Center>
    );
  }

  if (!product?.id) {
    toast.error(error.cantFindPost);
    return navigate("/");
  }

  console.log(product);

  const {
    id,
    medias,
    description,
    brand,
    manufacturer,
    status,
    summary,
    specification,
    name,
    created_at,
    price,
  } = product;

  const videos = medias.filter((media) => media.isImage === false);
  const images = medias.filter((media) => media.isImage === true);
  // re-order, vid up first
  const newMedia = [...videos, ...images];

  const settings = {
    customPaging: function (i: any) {
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
    infinite: newMedia.length > 1 ? true : false,
    speed: 500,
    initialSlide: index > 0 ? index : 0,
    draggable: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };

  function handleOpen(e: any) {
    const i = newMedia.findIndex((media) => media.id === Number(e.target.id));
    setIndex(i);
    onOpen();
  }

  return (
    <Box maxW="1500px" mx="auto" p={3} px={{ base: 2, md: 4, xl: 5 }}>
      <Helmet>
        <title>Chi tiết thông tin sản phẩm {name}</title>
      </Helmet>
      <Flex justify="space-between" align="center" pb={2}>
        <GoBackButton />
        <Flex gap={2}>
          <Tag
            variant="outline"
            colorScheme="green"
            fontSize={{ base: "xs", md: "sm" }}
          >
            type
          </Tag>
          <Tag
            variant="outline"
            colorScheme="green"
            fontSize={{ base: "xs", md: "sm" }}
          >
            type.name
          </Tag>
        </Flex>
      </Flex>
      <Box>
        <Flex
          gap={{ base: 2, lg: 4, xl: 5 }}
          display={{ base: "block", lg: "flex" }}
          px={{ base: 1, md: 1.5 }}
          justifyContent="space-between"
        >
          <Box>
            <Box mb={3.5} minH={400}>
              {isMobile ? (
                <Slider {...settings} className="slider-mobile">
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
                  <Flex w="50%" h="full">
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
                            id={images[0]?.id.toString()}
                            roundedLeft="lg"
                            src={images[0]?.mediaLink}
                          />
                        </Button>
                      )}
                    </AspectRatio>
                  </Flex>
                  {/* TODO: fix layout */}
                </Flex>
              )}
              {/* modal medias */}
              <DetailsMediasModal
                isOpen={isOpen}
                newMedia={newMedia}
                onClose={onClose}
                settings={settings}
              />
            </Box>

            {/* infs */}
            <Box maxW="full">
              <Heading fontSize="3xl" fontWeight="600">
                {name}
              </Heading>

              {/* stats */}
              <Box
                borderY="1px solid var(--chakra-colors-gray-200)"
                p={2}
                my={3}
              >
                <StatGroup
                  display={{ base: "grid", md: "flex" }}
                  gridTemplateColumns="repeat(2, 1fr)"
                  gridTemplateRows="1fr 1fr"
                  gridGap={1}
                >
                  <Stat mr={{ base: 0.5, md: 2.5, lg: 3 }}>
                    <StatLabel>Giá bán</StatLabel>
                    <StatNumber color={accent}>
                      {formatCurrency(price)}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Nhà sản xuất</StatLabel>
                    <StatNumber color={accent} textTransform="capitalize">
                      {manufacturer}
                    </StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Quy cách</StatLabel>
                    <StatNumber color={accent}>{specification}</StatNumber>
                  </Stat>
                </StatGroup>
              </Box>

              {/* des */}
              <Box pb={1}>
                <Heading fontSize="lg" color={accent}>
                  Thông tin mô tả
                </Heading>
                <Box h={200} fontSize="sm" height="fit-content">
                  <Box color={desColor} p={1.5}>
                    {parse(description!)}
                  </Box>
                </Box>
              </Box>

              {/* related posts */}
              <Box px={1}>
                <Heading fontSize="lg" color={accent}>
                  Sản phẩm cùng danh mục
                </Heading>
                {/* <RelatedPosts data={relatedPosts} isLoading={isQuerying} /> */}
              </Box>

              {/* disclaimer */}
              {!isMobile && <Disclaimer name={name} />}
            </Box>
          </Box>
          {/* sticky post author */}
          <StickyAuthorBox postID={id} />
        </Flex>
      </Box>
      {isMobile && <Disclaimer name={name} />}
    </Box>
  );
}

export default Details;
