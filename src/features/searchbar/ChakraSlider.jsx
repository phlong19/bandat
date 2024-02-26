import { useState } from "react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

function ChakraSlider({ value, sliderValue, setSliderValue }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toolTipBg = useColorModeValue("primary", "sec-light");
  const scheme = useColorModeValue("blue", "yellow");
  const color = useColorModeValue("white", "black");

  return (
    <Slider
      id="slider"
      defaultValue={0}
      min={0}
      max={value}
      value={sliderValue}
      colorScheme={scheme}
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0} mt={2} ml={-1} fontSize="sm">
        0
      </SliderMark>
      <SliderMark value={value / 2} mt={2} ml={-2.5} fontSize="sm">
        {value / 2}
      </SliderMark>
      <SliderMark value={value} mt={2} ml={-5} fontSize="sm">
        {value}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg={toolTipBg}
        color={color}
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
