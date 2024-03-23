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
  const color = useColorModeValue("white", "black");

  return (
    <RangeSlider
      id="slider"
      aria-label={["min", "max"]}
      defaultValue={[0, maxAreaSearch]}
      min={0}
      value={rangeValue}
      max={maxAreaSearch}
      colorScheme='green'
      onChange={(v) => setRangeValue(v)} mt={2.5}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>

      <Tooltip label={rangeValue[0]} bg={toolTipBg} color={color} hasArrow>
        <RangeSliderThumb index={0} key={Math.random()} />
      </Tooltip>
      <Tooltip label={rangeValue[1]} bg={toolTipBg} color={color} hasArrow>
        <RangeSliderThumb index={1} key={rangeValue[1]} />
      </Tooltip>
    </RangeSlider>
  );
}

export default ChakraRangeSlider;
