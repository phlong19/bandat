import { useState } from "react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

function ChakraSlider({ value, sliderValue, setSliderValue }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Slider
      id="slider"
      defaultValue={0}
      min={0}
      max={value}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
        0
      </SliderMark>

      <SliderMark value={value / 4} mt="1" ml="-2.5" fontSize="sm">
        {value / 4}
      </SliderMark>
      <SliderMark value={value / 2} mt="1" ml="-2.5" fontSize="sm">
        {value / 2}
      </SliderMark>
      <SliderMark value={(value * 4) / 5} mt="1" ml="-2.5" fontSize="sm">
        {(value * 2) / 3}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={sliderValue}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default ChakraSlider;
