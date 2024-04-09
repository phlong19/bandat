import Slider from "react-slick";
import { Spinner, Box, Center, Flex } from "@chakra-ui/react";

import ListItem from "../features/list/ListItem";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  draggable: false,
};

function RelatedPosts({ data, isLoading }) {
  console.log(data);

  return isLoading ? (
    <Center minH={300}>
      <Spinner size="md" />
    </Center>
  ) : (
    <Box w="full" maxW={1100} maxH={300}>
      <Slider {...settings}>
        {data.map((i) => (
          <ListItem data={i} key={i.id} purType={i.purType} />
        ))}
      </Slider>
    </Box>
  );
}

export default RelatedPosts;
