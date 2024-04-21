import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { m2, maxAreaSearch } from "../../constants/anyVariables";

function ChakraRangeSlider({ rangeValue, setRangeValue, setAbove, above }) {
  const toolTipBg = useColorModeValue("primary", "secondary");
  const color = useColorModeValue("white", "black");

  return (
    <>
      {!above && (
        <RangeSlider
          id="slider"
          aria-label={["min", "max"]}
          defaultValue={[1, maxAreaSearch]}
          min={1}
          value={rangeValue}
          max={maxAreaSearch}
          colorScheme="green"
          onChange={(v) => setRangeValue(v)}
          mt={2.5}
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
      )}
      <Checkbox size='sm' defaultChecked={above} onChange={() => setAbove((s) => !s)}>
        Tìm BĐS trên {maxAreaSearch} {m2}
      </Checkbox>
    </>
  );
}

export default ChakraRangeSlider;
