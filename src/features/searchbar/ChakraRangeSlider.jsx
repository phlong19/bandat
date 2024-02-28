import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { maxAreaSearch } from "../../constants/anyVariables";

function ChakraRangeSlider({ rangeValue, setRangeValue }) {
  const toolTipBg = useColorModeValue("primary", "secondary");
  const scheme = useColorModeValue("blue", "yellow");
  const color = useColorModeValue("white", "black");

  return (
    <RangeSlider
      id="slider"
      aria-label={["min", "max"]}
      defaultValue={[0, maxAreaSearch]}
      min={0}
      max={maxAreaSearch}
      colorScheme={scheme}
      onChange={(v) => setRangeValue(v)}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>

      <Tooltip label={rangeValue[0]} bg={toolTipBg} color={color} hasArrow>
        <RangeSliderThumb index={0} />
      </Tooltip>
      <Tooltip label={rangeValue[1]} bg={toolTipBg} color={color} hasArrow>
        <RangeSliderThumb index={1} />
      </Tooltip>
    </RangeSlider>
  );
}

export default ChakraRangeSlider;
